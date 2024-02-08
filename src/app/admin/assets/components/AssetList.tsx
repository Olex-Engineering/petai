'use client';

import { Accordion, AccordionItem, Avatar, Button, Spinner } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { CreateAsset } from "./CreateAsset";
import { useUmi } from "@/app/shareable/hooks/useUmi";
import { fetchAllDigitalAssetByVerifiedCollection } from "@metaplex-foundation/mpl-token-metadata";
import { Umi, publicKey } from "@metaplex-foundation/umi";
import { ASSET_COLLECTION_MINT_PDA } from "@/app/utils/pda-constants";
import { MetadataFormValue } from "../../shareable/CreateMetadataForm";
import { UpdateAsset } from "./UpdateAsset";
import Icon from "react-icons-kit";
import {ic_autorenew} from 'react-icons-kit/md/ic_autorenew'

export const AssetList: FC = () => {
    const [isCreateEnabled, setIsCreateEnabled] = useState(false);
    const [assetsList, setAssetsList] = useState<MetadataFormValue[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const umi = useUmi();

    useEffect(() => {
        if (!umi) {
            return;
        }

        fetchAssets(umi);
    }, [umi]);

    const fetchAssets = async (umi: Umi) => {
        setIsLoading(true);
        const assets = await fetchAllDigitalAssetByVerifiedCollection(umi, publicKey(ASSET_COLLECTION_MINT_PDA));
        
        console.log(assets);
        const assetsMetadataValues = await Promise.all(assets.map(async (asset) => {
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

        setAssetsList(assetsMetadataValues);
        setIsLoading(false);
    }

    const onCreated = () => {
        setIsCreateEnabled(false);
        fetchAssets(umi!);
    }

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl'>Asset List</h1>
                <div className='flex items-center'>
                    <Button onClick={() => fetchAssets(umi!)} size="sm" isIconOnly={true} variant="bordered" className="mr-2">
                        <Icon size={14}  icon={ic_autorenew} />
                    </Button>
                    <Button
                        variant={'ghost'}
                        size='sm'
                        color={'secondary'}
                        onClick={() => setIsCreateEnabled(true)}
                        isDisabled={isCreateEnabled}
                    >
                        Create new asset
                    </Button>
                </div>
                
            </div>
            {!!isLoading
                    ? <div className="py-2">
                        <Spinner></Spinner> 
                    </div>
                    : <Accordion selectionMode='multiple'>
                        {isCreateEnabled && 
                            <AccordionItem key="Create" title={'Create new asset'}>
                                <CreateAsset onCanceled={() => setIsCreateEnabled(false)} onCreated={onCreated}></CreateAsset>
                            </AccordionItem>
                        }
        
                        
                        {assetsList.map((asset) => (
                            <AccordionItem title={asset.name} key={asset.name} startContent={(
                                <Avatar radius="lg" isBordered={true} src={asset.imageUrl} alt={asset.name} />
                            )}>
                                <UpdateAsset
                                    defaultMetadata={asset}
                                ></UpdateAsset>
                            </AccordionItem>
                        ))}
                    </Accordion>
            }
         </div>
    );
}