'use client';

import { FC, useEffect, useState } from "react";
import { MetadataAttribute, MetadataFormValue } from "../../shareable/CreateMetadataForm";
import { v4 } from "uuid";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { ASSET_COLLECTION_MASTER_EDITION_PDA, ASSET_COLLECTION_METADATA_PDA, ASSET_COLLECTION_MINT_PDA, PROGRAM_STATE_PDA, getTokenMetadataPda, getTokenMintPda, getAssetStatePda } from "@/app/utils/pda-constants";
import { toast } from "react-toastify";
import { TransactionInstruction } from "@solana/web3.js";
import { CreateToken } from "../../shareable/tokens/CreateToken";
import { BN } from "@coral-xyz/anchor";

export interface CreateAssetProps {
    onCreated: () => void;
    onCanceled: () => void;
}

const INCREASE_FOOD_ATTR_NAME = 'Increase food';
const INCREASE_LONELINESS_ATTR_NAME = 'Increase loneliness';
const INCREASE_LOVE_ATTR_NAME = 'Increase love';
const PRICE_ATTR_NAME = 'Price';

export const CreateAsset: FC<CreateAssetProps> = ({onCanceled, onCreated}) => {
    const [defaultMetadataValues, setDefaultMetadataValues] = useState<Partial<MetadataFormValue>>();
    const { program } = useAnchor();

    useEffect(() => {
        const defaultAttributes: MetadataAttribute[] = [INCREASE_FOOD_ATTR_NAME, INCREASE_LONELINESS_ATTR_NAME, INCREASE_LOVE_ATTR_NAME, PRICE_ATTR_NAME]
            .map((trait_type) => ({
                id: v4(),
                trait_type,
                value: '1',
                isCanBeDeleted: false,
                isNameCanBeChanged: false
            }));

        setDefaultMetadataValues({
            attributes: defaultAttributes
        })
    }, []);

    const customValidation = (metadataFormValue: MetadataFormValue) => {
        const increaseFood = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_FOOD_ATTR_NAME)!.value;
        const increaseLoneliness = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_LONELINESS_ATTR_NAME)!.value;
        const increaseLove = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_LOVE_ATTR_NAME)!.value;
        const price = +metadataFormValue.attributes.find((attr) => attr.trait_type === PRICE_ATTR_NAME)!.value;

        if (isNaN(increaseFood) || isNaN(increaseLoneliness) || isNaN(increaseLove) || isNaN(price)) {
            toast.error('Invalid attributes values. (Only numbers are allowed)');
            return false;
        }

        return true;
    }

    const createAssetInstructions = async (metadataFormValue: MetadataFormValue): Promise<TransactionInstruction[]> => {
        const increaseFood = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_FOOD_ATTR_NAME)!.value;
        const increaseLoneliness = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_LONELINESS_ATTR_NAME)!.value;
        const increaseLove = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_LOVE_ATTR_NAME)!.value;
        const price = new BN(+metadataFormValue.attributes.find((attr) => attr.trait_type === PRICE_ATTR_NAME)!.value);


        if (!program) {
            return [];
        }

        const assetMintPda = getTokenMintPda(metadataFormValue.name)[0];
        const createAssetInstruction = await program.methods.putAsset({
            assetMint: assetMintPda,
            increaseFood,
            increaseLoneliness,
            increaseLove,
            price
        }).accounts({
            assetState: getAssetStatePda(assetMintPda)[0],
            state: PROGRAM_STATE_PDA,
        }).instruction();

        return [createAssetInstruction]
    }


    return (
        <CreateToken
            onCanceled={onCanceled}
            onCreated={onCreated}
            defaultMetadataValuesProp={defaultMetadataValues}
            customValidation={customValidation}
            getAdditionalInstructions={createAssetInstructions}
            collectionProps={{
                mintPda: ASSET_COLLECTION_MINT_PDA,
                metadataPda: ASSET_COLLECTION_METADATA_PDA,
                masterEditionPda: ASSET_COLLECTION_MASTER_EDITION_PDA,
            }}
        ></CreateToken>
    );
};