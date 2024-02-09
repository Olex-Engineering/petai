'use client';

import {  AccordionItem, Avatar } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { CreateAsset } from "./CreateAsset";
import { useUmi } from "@/app/shareable/hooks/useUmi";
import { fetchAllDigitalAssetByVerifiedCollection } from "@metaplex-foundation/mpl-token-metadata";
import { Umi, publicKey } from "@metaplex-foundation/umi";
import { ASSET_COLLECTION_MINT_PDA } from "@/app/utils/pda-constants";
import { MetadataFormValue } from "../../shareable/CreateMetadataForm";
import { ItemListWithCreate } from "../../shareable/ItemListWithCreate";
import { UpdateAsset } from "./UpdateAsset";

export const AssetList: FC = () => {
    const umi = useUmi();

    useEffect(() => {
        if (!umi) {
            return;
        }
    }, [umi]);

    const fetchAssets = async (umi: Umi) => {
        const assets = await fetchAllDigitalAssetByVerifiedCollection(umi, publicKey(ASSET_COLLECTION_MINT_PDA));
        
        return Promise.all(assets.map(async (asset) => {
            const s3Response = await fetch(asset.metadata.uri);
            const metadataFormValue: MetadataFormValue = await s3Response.json();
            metadataFormValue.attributes = metadataFormValue.attributes.map((attribute) => {
                return {
                    ...attribute,
                    id: attribute.trait_type,
                    isCanBeDeleted: false,
                    isNameCanBeChanged: false
                }
            });
            
            return metadataFormValue
        }));
    }

    return (
        <ItemListWithCreate<MetadataFormValue>
            itemName='Asset'
            fetchItemsFn={() => fetchAssets(umi!)}
            renderCreateItemFn={(onCanceled, onCreated) => {
                return (<CreateAsset onCanceled={onCanceled} onCreated={onCreated}></CreateAsset>)
            }}
            renderListItemFn={(value) => {
                return (
                    <AccordionItem title={value.name} key={value.name} startContent={(
                        <Avatar radius="lg" isBordered={true} src={value.imageUrl} alt={value.name} />
                    )}>
                        <UpdateAsset
                            defaultMetadata={value}
                        ></UpdateAsset>
                    </AccordionItem>
                );
            }}
        ></ItemListWithCreate>
    );
}