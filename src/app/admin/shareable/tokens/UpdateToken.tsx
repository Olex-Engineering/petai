'use client';

import { FC, FormEventHandler, useEffect, useState } from "react";
import { CreateMetadataForm, MetadataFormValue } from "../../shareable/CreateMetadataForm";
import { Button, Spinner } from "@nextui-org/react";
import { uploadMetadataToAws } from "@/app/utils/s3-utils";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { getTokenOptions } from "@/app/utils/token-utils";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { ADMIN_KEY } from "@/app/utils/constants";
import { toast } from "react-toastify";
import { PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PROGRAM_STATE_PDA, getTokenMetadataPda, getTokenMintPda } from "@/app/utils/pda-constants";

export interface UpdateTokenProps {
    onCreated: () => void;
    defaultMetadataValuesProp?: Partial<MetadataFormValue>;
    customValidation?: (metadataFormValue: MetadataFormValue) => boolean;
    getAdditionalInstructions?: (metadataFormValue: MetadataFormValue) => Promise<TransactionInstruction[]>;
}

export interface UpdateTokenCollectionProps {
    mintPda: PublicKey;
    metadataPda: PublicKey;
    masterEditionPda: PublicKey;
}


export const UpdateToken: FC<UpdateTokenProps> = ({onCreated, defaultMetadataValuesProp, customValidation, getAdditionalInstructions}) => {
    const [metadataFormValue, setMetadataFomValue] = useState<MetadataFormValue>();
    const [defaultMetadataValues, setDefaultMetadataValues] = useState<Partial<MetadataFormValue>>();
    const [isLoading, setIsLoading] = useState(false);
    const { program } = useAnchor();
    const { wallet } = useWallet();
    const { connection } = useConnection();

    useEffect(() => {
        setDefaultMetadataValues(defaultMetadataValuesProp);
    }, [defaultMetadataValuesProp]);

    const UpdateToken = async () => {
        if (!program || !metadataFormValue || !connection || !wallet) {
            return;
        }

        if (customValidation && !customValidation(metadataFormValue)) {
            return;
        }

        const transaction = new Transaction();
        const metadataUri = await uploadMetadataToAws(metadataFormValue);
        const tokenMintPda = getTokenMintPda(metadataFormValue.name)[0];
        const tokenMetadataPda = getTokenMetadataPda(metadataFormValue.name)[0];
        const tokenAccount = getAssociatedTokenAddressSync(
            tokenMintPda,
            ADMIN_KEY
          )

        // Create token
        const updateTokenInstruction = await program.methods.updateToken(
            getTokenOptions({
                name: metadataFormValue.name,
                uri: metadataUri,
                symbol: metadataFormValue.symbol,
                collectionMint: null,
                tokenType: {
                    fungibleAsset: {}
                },
                creator: PROGRAM_STATE_PDA
            })
        ).accounts({
            state: PROGRAM_STATE_PDA,
            mint: tokenMintPda,
            metadataAccount: tokenMetadataPda,
            masterEdition: null,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            ataAccount: tokenAccount,
            sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY
        }).instruction();

        transaction.add(updateTokenInstruction);
        const additionalInstructions = await getAdditionalInstructions?.(metadataFormValue);
        additionalInstructions?.forEach((instruction) => {
            transaction.add(instruction);
        })

        const tx = await wallet?.adapter.sendTransaction(transaction, connection);
        console.log(tx);
    };

    const formSubmitHandler: FormEventHandler = async(event) => {
        event.preventDefault();

        setIsLoading(true);

        try {
            await UpdateToken();
            setIsLoading(false);
            toast.success('Asset has been updated successfully!');
            onCreated();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error('Opps! Something went wrong. Please try again.');
        }
    }

    return (
        <form action='#' className='pb-5' onSubmit={formSubmitHandler}>
            <CreateMetadataForm
                onChange={setMetadataFomValue}
                defaultValue={defaultMetadataValues}>
            </CreateMetadataForm>
            <div className='mt-6 flex items-center justify-end'>
                {isLoading 
                    ?  <Spinner></Spinner>
                    : <>
                        <Button type='submit' variant='solid' color='primary' className='mr-2'>
                            Update
                        </Button>
                    </>
                }
            </div>
        </form>
    );
};