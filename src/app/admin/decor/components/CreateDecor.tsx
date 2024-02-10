'use client';

import { FC, useEffect, useState } from "react";
import { MetadataAttribute, MetadataFormValue } from "../../shareable/CreateMetadataForm";
import { useAnchor } from "@/app/shareable/providers/AnchorContextProvider";
import { PROGRAM_STATE_PDA, getTokenMintPda, getDecorStatePda, DECOR_COLLECTION_MINT_PDA, DECOR_COLLECTION_METADATA_PDA, DECOR_COLLECTION_MASTER_PDA } from "@/app/utils/pda-constants";
import { TransactionInstruction } from "@solana/web3.js";
import { CreateToken } from "../../shareable/tokens/CreateToken";
import { v4 } from "uuid";
import { DECOR_GLOBAL_TYPE_ATTR_NAME, DECOR_TYPE_OPTIONS } from "../utils/constants";

export interface CreateDecorProps {
    onCreated: () => void;
    onCanceled: () => void;
}

export const CreateDecor: FC<CreateDecorProps> = ({onCanceled, onCreated}) => {
    const [defaultMetadataValues, setDefaultMetadataValues] = useState<Partial<MetadataFormValue>>();
    const { program } = useAnchor();

    useEffect(() => {
        const defaultAttributes: MetadataAttribute[] = [
            {
                id: v4(),
                trait_type: DECOR_GLOBAL_TYPE_ATTR_NAME,
                value: '1',
                isCanBeDeleted: false,
                isNameCanBeChanged: false,
                options: DECOR_TYPE_OPTIONS
            },
        ]

        setDefaultMetadataValues({
            attributes: defaultAttributes
        })
    }, []);

    const createDecorInstructions = async (metadataFormValue: MetadataFormValue): Promise<TransactionInstruction[]> => {
        if (!program) {
            return [];
        }

        const typeValue = metadataFormValue.attributes.find((attr) => attr.trait_type === DECOR_GLOBAL_TYPE_ATTR_NAME)!.value;
        const mintPda = getTokenMintPda(metadataFormValue.name)[0];
        const createDecorInstruction = await program.methods.putDecor({
            mint: mintPda,
            globalType: {
                [typeValue]: {}
            } as any
        }).accounts({
            decorState: getDecorStatePda(mintPda)[0],
            state: PROGRAM_STATE_PDA,
        }).instruction();

        return [createDecorInstruction]
    }


    return (
        <CreateToken
            onCanceled={onCanceled}
            onCreated={onCreated}
            defaultMetadataValuesProp={defaultMetadataValues}
            getAdditionalInstructions={createDecorInstructions}
            collectionProps={{
                mintPda: DECOR_COLLECTION_MINT_PDA,
                metadataPda: DECOR_COLLECTION_METADATA_PDA,
                masterEditionPda: DECOR_COLLECTION_MASTER_PDA,
            }}
        ></CreateToken>
    );
};