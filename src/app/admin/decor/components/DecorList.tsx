'use client';

import { AccordionItem, Avatar } from "@nextui-org/react";
import { FC, useEffect } from "react";
import { CreateDecor } from "./CreateDecor";
import { useUmi } from "@/app/shareable/hooks/useUmi";
import { fetchAllDigitalAssetByVerifiedCollection } from "@metaplex-foundation/mpl-token-metadata";
import { Umi, publicKey } from "@metaplex-foundation/umi";
import { DECOR_COLLECTION_MINT_PDA } from "@/app/utils/pda-constants";
import { MetadataFormValue } from "../../shareable/CreateMetadataForm";
import { ItemListWithCreate } from "../../shareable/ItemListWithCreate";
import { UpdateDecor } from "./UpdateDecor";
import { DECOR_GLOBAL_TYPE_ATTR_NAME, DECOR_TYPE_OPTIONS } from "../utils/constants";

export const DecorList: FC = () => {
    const umi = useUmi();

    useEffect(() => {
        if (!umi) {
            return;
        }
    }, [umi]);

    const fetchDecors = async (umi: Umi) => {
        const decors = await fetchAllDigitalAssetByVerifiedCollection(umi, publicKey(DECOR_COLLECTION_MINT_PDA));
        
        return Promise.all(decors.map(async (decor) => {
            const s3Response = await fetch(decor.metadata.uri);
            const metadataFormValue: MetadataFormValue = await s3Response.json();

            metadataFormValue.attributes = metadataFormValue.attributes.map((attribute) => {
                if (attribute.trait_type ===  DECOR_GLOBAL_TYPE_ATTR_NAME) {
                    return {
                        ...attribute,
                        id: attribute.trait_type,
                        isCanBeDeleted: false,
                        isNameCanBeChanged: false,
                        options: DECOR_TYPE_OPTIONS
                    }
                }

                return {
                    ...attribute,
                    id: attribute.trait_type,
                }
            });
            
            return metadataFormValue
        }));
    }

    return (
        <ItemListWithCreate<MetadataFormValue>
            itemName='Decor'
            fetchItemsFn={() => fetchDecors(umi!)}
            renderCreateItemFn={(onCanceled, onCreated) => {
                return (<CreateDecor onCanceled={onCanceled} onCreated={onCreated}></CreateDecor>)
            }}
            renderListItemFn={(value) => {
                return (
                    <AccordionItem title={value.name} key={value.name} startContent={(
                        <Avatar radius="lg" isBordered={true} src={value.imageUrl} alt={value.name} />
                    )}>
                        <UpdateDecor
                            defaultMetadata={value}
                        ></UpdateDecor>
                    </AccordionItem>
                );
            }}
        ></ItemListWithCreate>
    );
}