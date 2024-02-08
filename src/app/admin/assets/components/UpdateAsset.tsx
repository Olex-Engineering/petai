'use client';

import { FC, useEffect, useState } from "react";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { toast } from "react-toastify";
import { TransactionInstruction } from "@solana/web3.js";
import { UpdateToken } from "../../shareable/tokens/UpdateToken";
import { getTokenMintPda, getAssetStatePda, PROGRAM_STATE_PDA } from "@/app/utils/pda-constants";
import { MetadataFormValue } from "../../shareable/CreateMetadataForm";

export interface UpdateAssetProps {
    onUpdated?: () => void;
    defaultMetadata: MetadataFormValue;
}

const INCREASE_FOOD_ATTR_NAME = 'Increase food';
const INCREASE_LONELINESS_ATTR_NAME = 'Increase loneliness';
const INCREASE_LOVE_ATTR_NAME = 'Increase love';

export const UpdateAsset: FC<UpdateAssetProps> = ({defaultMetadata, onUpdated}) => {
    const [defaultMetadataValues, setDefaultMetadataValues] = useState<Partial<MetadataFormValue>>();
    const { program } = useAnchor();

    useEffect(() => {
        setDefaultMetadataValues(defaultMetadata)
    }, [defaultMetadata]);

    const customValidation = (metadataFormValue: MetadataFormValue) => {
        const increaseFood = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_FOOD_ATTR_NAME)!.value;
        const increaseLoneliness = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_LONELINESS_ATTR_NAME)!.value;
        const increaseLove = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_LOVE_ATTR_NAME)!.value;

        if (isNaN(increaseFood) || isNaN(increaseLoneliness) || isNaN(increaseLove)) {
            toast.error('Invalid attributes values. (Only numbers are allowed)');
            return false;
        }

        return true;
    }

    const UpdateAssetInstructions = async (metadataFormValue: MetadataFormValue): Promise<TransactionInstruction[]> => {
        const increaseFood = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_FOOD_ATTR_NAME)!.value;
        const increaseLoneliness = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_LONELINESS_ATTR_NAME)!.value;
        const increaseLove = +metadataFormValue.attributes.find((attr) => attr.trait_type === INCREASE_LOVE_ATTR_NAME)!.value;


        if (!program) {
            return [];
        }

        const assetMintPda = getTokenMintPda(metadataFormValue.name)[0];
        const UpdateAssetInstruction = await program.methods.putAsset({
            assetMint: assetMintPda,
            increaseFood,
            increaseLoneliness,
            increaseLove
        }).accounts({
            assetState: getAssetStatePda(assetMintPda)[0],
            state: PROGRAM_STATE_PDA,
        }).instruction();

        return [UpdateAssetInstruction]
    }


    return (
        <UpdateToken
            onCreated={() => onUpdated?.()}
            defaultMetadataValuesProp={defaultMetadataValues}
            customValidation={customValidation}
            getAdditionalInstructions={UpdateAssetInstructions}
        ></UpdateToken>
    );
};