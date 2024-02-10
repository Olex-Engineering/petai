'use client';

import { FC, FormEventHandler, useEffect, useState } from "react";
import { CreateMetadataForm, MetadataFormValue } from "../../shareable/CreateMetadataForm";
import { Button, Input, Spinner } from "@nextui-org/react";
import { uploadMetadataToAws } from "@/app/utils/s3-utils";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { BN } from "@coral-xyz/anchor";
import { TokenType, getTokenOptions } from "@/app/utils/token-utils";
import { MPL_TOKEN_METADATA_PROGRAM_ID, PrintSupply } from "@metaplex-foundation/mpl-token-metadata";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { ADMIN_KEY } from "@/app/utils/constants";
import { toast } from "react-toastify";
import { ComputeBudgetInstruction, ComputeBudgetProgram, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PROGRAM_STATE_PDA, getTokenMetadataPda, getTokenMintPda } from "@/app/utils/pda-constants";

export interface CreateTokenProps {
    onCreated: () => void;
    onCanceled: () => void;
    defaultMetadataValuesProp?: Partial<MetadataFormValue>;
    customValidation?: (metadataFormValue: MetadataFormValue) => boolean;
    getAdditionalInstructions?: (metadataFormValue: MetadataFormValue) => Promise<TransactionInstruction[]>;
    tokenProps?: CreateTokenOptionsProps;
    collectionProps?: CreateTokenCollectionProps;
    showNumberTokenToMint?: boolean;
}

export interface CreateTokenCollectionProps {
    mintPda: PublicKey;
    metadataPda: PublicKey;
    masterEditionPda: PublicKey;
}

export interface CreateTokenOptionsProps {
    tokenType: TokenType;
}

export const CreateToken: FC<CreateTokenProps> = ({onCanceled, onCreated, defaultMetadataValuesProp, customValidation, getAdditionalInstructions, collectionProps, tokenProps, showNumberTokenToMint = true}) => {
    const [metadataFormValue, setMetadataFomValue] = useState<MetadataFormValue>();
    const [defaultMetadataValues, setDefaultMetadataValues] = useState<Partial<MetadataFormValue>>();
    const [numberTokenToMint, setNumberTokenToMint] = useState<number>(showNumberTokenToMint ? 10000000 : 1);
    const [isLoading, setIsLoading] = useState(false);
    const { program } = useAnchor();
    const { wallet } = useWallet();
    const { connection } = useConnection();

    useEffect(() => {
        setDefaultMetadataValues(defaultMetadataValuesProp);
    }, [defaultMetadataValuesProp]);

    const createToken = async () => {
        if (!program || !metadataFormValue || !connection || !wallet) {
            return;
        }

        if (customValidation && !customValidation(metadataFormValue)) {
            return;
        }

        const metadataUri = await uploadMetadataToAws(metadataFormValue);
        const tokenMintPda = getTokenMintPda(metadataFormValue.name)[0];
        const tokenMetadataPda = getTokenMetadataPda(metadataFormValue.name)[0];
        const tokenAccount = getAssociatedTokenAddressSync(
            tokenMintPda,
            ADMIN_KEY
          )

        const additionalInstructions = await getAdditionalInstructions?.(metadataFormValue);

        // Create token
        const tx = await program.methods.createToken(
            metadataFormValue.name,
            new BN(numberTokenToMint),
            getTokenOptions({
                name: metadataFormValue.name,
                uri: metadataUri,
                symbol: metadataFormValue.symbol,
                collectionMint: collectionProps?.mintPda || null,
                tokenType: tokenProps?.tokenType || {
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
            collectionMint: collectionProps?.mintPda,
            collectionMetadata: collectionProps?.metadataPda || null,
            collectionMasterEdition: collectionProps?.masterEditionPda || null
        })
        .preInstructions([ComputeBudgetProgram.setComputeUnitLimit({ units: 500_000 })])
        .postInstructions(additionalInstructions || [])
        .rpc();

        console.log(tx);
    };

    const formSubmitHandler: FormEventHandler = async(event) => {
        event.preventDefault();

        setIsLoading(true);

        try {
            await createToken();
            setIsLoading(false);
            toast.success('Asset has been created successfully!');
            onCreated();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error('Name already exists! Please choose another name.');
        }
    }

    return (
        <form action='#' className='pb-5' onSubmit={formSubmitHandler}>
            <div className='pb-6 pt-1'>
                <Input
                    isRequired={true}
                    variant='bordered'
                    type='number'
                    label='Number of token to mint'
                    min={0}
                    isReadOnly={!showNumberTokenToMint}
                    value={numberTokenToMint.toString()}
                    onValueChange={(value) => setNumberTokenToMint(+value)}
                    placeholder="Enter"
                    className='w-1/2 pr-4'
                />
            </div>
            <CreateMetadataForm
                onChange={setMetadataFomValue}
                defaultValue={defaultMetadataValues}>
            </CreateMetadataForm>
            <div className='mt-6 flex items-center justify-end'>
                {isLoading 
                    ?  <Spinner></Spinner>
                    : <>
                        <Button type='submit' variant='solid' color='primary' className='mr-2'>
                            Submit
                        </Button>
                        <Button onClick={onCanceled} variant='bordered' color='default' className='mr-2'>
                            Cancel
                        </Button>
                    </>
                }
            </div>
        </form>
    );
};