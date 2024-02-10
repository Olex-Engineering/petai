'use client';

import { FC, useEffect, useState } from "react";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { TransactionInstruction } from "@solana/web3.js";
import { UpdateToken } from "../../shareable/tokens/UpdateToken";
import { getTokenMintPda, PROGRAM_STATE_PDA, getDecorStatePda } from "@/app/utils/pda-constants";
import { MetadataFormValue } from "../../shareable/CreateMetadataForm";
import { DECOR_GLOBAL_TYPE_ATTR_NAME } from "../utils/constants";

export interface UpdateDecorProps {
    onUpdated?: () => void;
    defaultMetadata: MetadataFormValue;
}

export const UpdateDecor: FC<UpdateDecorProps> = ({defaultMetadata, onUpdated}) => {
    const [defaultMetadataValues, setDefaultMetadataValues] = useState<Partial<MetadataFormValue>>();
    const { program } = useAnchor();

    useEffect(() => {
        setDefaultMetadataValues(defaultMetadata)
    }, [defaultMetadata]);

    const UpdateDecorInstructions = async (metadataFormValue: MetadataFormValue): Promise<TransactionInstruction[]> => {
        if (!program) {
            return [];
        }

        const typeValue = metadataFormValue.attributes.find((attr) => attr.trait_type === DECOR_GLOBAL_TYPE_ATTR_NAME)!.value;
        const mintPda = getTokenMintPda(metadataFormValue.name)[0];
        const UpdateDecorInstruction = await program.methods.putDecor({
            mint: mintPda,
            globalType: {
                [typeValue]: {}
            } as any
        }).accounts({
            decorState: getDecorStatePda(mintPda)[0],
            state: PROGRAM_STATE_PDA,
        }).instruction();

        return [UpdateDecorInstruction]
    }


    return (
        <UpdateToken
            onCreated={() => onUpdated?.()}
            defaultMetadataValuesProp={defaultMetadataValues}
            getAdditionalInstructions={UpdateDecorInstructions}
        ></UpdateToken>
    );
};