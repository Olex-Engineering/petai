import { useUmi } from "@/app/shareable/hooks/useUmi";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { BUCKET_COLLECTION_METADATA_NAME, BUCKET_URL, PET_COLLECTION_MINT_SEED } from "@/app/utils/constants";
import { PET_COLLECTION_METADATA_PDA, PET_COLLECTION_MINT_PDA, PROGRAM_STATE_PDA, PET_COLLECTION_MASTER_PDA } from "@/app/utils/pda-constants";
import { BN } from "@coral-xyz/anchor";
import { fetchMetadata, MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";
import { Spinner, Button } from "@nextui-org/react";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY } from "@solana/web3.js";
import { remove } from "aws-amplify/storage";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MetadataFormValue, CreateMetadataForm } from "../CreateMetadataForm";
import { uploadMetadataToAws } from "@/app/utils/s3-utils";
import { getNftCollectionOptions } from "@/app/utils/nft-utils";

export interface PutCollectionProps {
    metadataOptions: CollectionOptionsProps,
}

export interface CollectionOptionsProps {
    mintSeed: string;
    mintPda: PublicKey;
    metadataPda: PublicKey;
    masterEditionPda: PublicKey;
}

export const PutCollection: FC<PutCollectionProps> = ({ metadataOptions }) => {
    const { program, provider } = useAnchor();
    const { connection } = useConnection();
    const [formValue, setFormValue] = useState<MetadataFormValue>();
    const [defaultMetadata, setDefaultMetadata] = useState<MetadataFormValue>();
    const [defaultMetadataUri, setDefaultMetadataUri] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
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
            const data = await fetchMetadata(umi, publicKey(metadataOptions.metadataPda));

            if (!data) {
                setIsLoading(false);
                return;
            }

            const awsDataResponse = await fetch(data.uri);
            const awsData = await awsDataResponse.json() as MetadataFormValue;
            setDefaultMetadata(awsData);
            setDefaultMetadataUri(data.uri);
        } catch (error) {
            console.error('Error fetching metadata:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const update = async (metadataValue: MetadataFormValue, metadataUri: string, tokenAccount: PublicKey) => {
        const oldMetadataWeb2Key = defaultMetadataUri!.replace(BUCKET_URL, '');

        remove({
            key: oldMetadataWeb2Key
        });

        return await program?.methods.updateToken(
            getNftCollectionOptions({
                name: metadataValue.name,
                symbol: metadataValue.symbol,
                uri: metadataUri,
                creator: PROGRAM_STATE_PDA,
            })
        ).accounts({
            state: PROGRAM_STATE_PDA,
            mint: metadataOptions.mintPda,
            metadataAccount: metadataOptions.metadataPda,
            masterEdition: metadataOptions.masterEditionPda,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            ataAccount: tokenAccount,
            sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY
        }).rpc();
    }

    const create = async (metadataValue: MetadataFormValue, metadataUri: string, tokenAccount: PublicKey) => {
        return await program?.methods.createToken(
            metadataOptions.mintSeed,
            new BN(1),
            getNftCollectionOptions({
                name: metadataValue.name,
                symbol: metadataValue.symbol,
                uri: metadataUri,
                creator: PROGRAM_STATE_PDA,
            })
        ).accounts({
            state: PROGRAM_STATE_PDA,
            mint: metadataOptions.mintPda,
            metadataAccount: metadataOptions.metadataPda,
            masterEdition: metadataOptions.masterEditionPda,
            metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
            ataAccount: tokenAccount,
            collectionMint: null,
            collectionMetadata: null,
            collectionMasterEdition: null
        }).rpc();
    }

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const tokenAccount = getAssociatedTokenAddressSync(
            metadataOptions.mintPda,
            provider!.wallet.publicKey
        );

        const metadataValue = formValue as MetadataFormValue;
        const metadataUri = await uploadMetadataToAws(metadataValue);

        try {
            let tx;
            if (defaultMetadataUri) {
                tx = await update(metadataValue, metadataUri, tokenAccount);
                toast.success('Collection has been updated');
            } else {
                tx = await create(metadataValue, metadataUri, tokenAccount);
                toast.success('Collection has been created');
            }

            console.log('Transaction: ', tx);
        } catch {
            toast.error('Oopps... Something went wrong');
        }
        
        
        setDefaultMetadata(metadataValue);
        setDefaultMetadataUri(metadataUri);
        setIsLoading(false);
    };

    return (
        <form action={'#'} onSubmit={handleSubmit}>
            <CreateMetadataForm defaultValue={defaultMetadata} onChange={setFormValue}></CreateMetadataForm>
            <div className='mt-8'>
                { isLoading ? <Spinner /> : 
                        <Button variant={'shadow'} color={'primary'} type={'submit'}>
                            {!!defaultMetadataUri ? 'Update' : 'Create'}
                        </Button>
                }
            </div>
        </form>
    );
}