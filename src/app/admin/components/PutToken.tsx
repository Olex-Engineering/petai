'use client';

import { FC, FormEventHandler, useEffect, useState } from "react";
import { CreateToken } from "../shareable/tokens/CreateToken";
import { PROGRAM_STATE_PDA, getTokenMetadataPda, getTokenMintPda } from "@/app/utils/pda-constants";
import { getProgramState } from "@/app/utils/get-program-state";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { MetadataFormValue } from "../shareable/CreateMetadataForm";
import { UpdateToken } from "../shareable/tokens/UpdateToken";
import { useUmi } from "@/app/shareable/hooks/useUmi";
import { useConnection } from "@solana/wallet-adapter-react";
import { fetchMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { Spinner } from "@nextui-org/react";
import { DEFAULT_TOKEN_NAME } from "@/app/utils/constants";
import { toast } from "react-toastify";

export interface PutTokenProps {
}

export const PutToken: FC<PutTokenProps> = () => {
    const [mode, setIsMode] = useState<'create' | 'update'>('create');
    const [defaultMetadataValues, setDefaultMetadataValues] = useState<Partial<MetadataFormValue>>();
    const [isLoading, setIsLoading] = useState(false);
    const { program } = useAnchor();
    const { connection } = useConnection();
    const umi = useUmi();

    useEffect(() => {
        handleExistingMetadataInfo();
    }, [umi, connection]);

    const handleExistingMetadataInfo = async () => {
        try {
            if (!umi) {
                return;
            }

            setIsLoading(true);

            const tokenMetadata = getTokenMetadataPda(DEFAULT_TOKEN_NAME)[0];
            const data = await fetchMetadata(umi, publicKey(tokenMetadata));

            if (!data) {
                setIsLoading(false);
                return;
            }

            const awsDataResponse = await fetch(data.uri);
            const awsData = await awsDataResponse.json() as MetadataFormValue;
            setDefaultMetadataValues(awsData);
            setIsMode('update');
        } catch (error) {
            console.error('Error fetching metadata:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const getUpdateStateInstruction = async (metadataFormValue: MetadataFormValue) => {
        const mintAddress = getTokenMintPda(metadataFormValue.name)[0];
        const state = await getProgramState(program);

        setDefaultMetadataValues(metadataFormValue);

        return [
            await program!.methods
                .updateProgramState({
                    ...state,
                    tokenMint: mintAddress
                })
                .accounts({
                    state: PROGRAM_STATE_PDA
                })
                .instruction()
        ];
    }

    if (isLoading) {
        return (
            <Spinner></Spinner>
        )
    }

    return (
        <div>
            { mode === 'create' && 
                <CreateToken
                    onCanceled={() => setIsMode('create')}
                    onCreated={() => setIsMode('update')}
                    getAdditionalInstructions={getUpdateStateInstruction}
                    tokenProps={{
                        tokenType: {
                            fungible: {}
                        }
                    }}
                    isNameReadOnly={true}
                    isCancelShow={false}
                    defaultMetadataValuesProp={{
                        name: DEFAULT_TOKEN_NAME
                    }}
                >
                </CreateToken>
            }
            { mode === 'update' &&
                <UpdateToken
                    defaultMetadataValuesProp={defaultMetadataValues}
                    onCreated={() => {}}
                >
                </UpdateToken>
            }
        </div>
    );
}