'use client';

import { FC } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { PutCollection } from "./PutCollection";
import { ASSET_COLLECTION_MASTER_EDITION_PDA, ASSET_COLLECTION_METADATA_PDA, ASSET_COLLECTION_MINT_PDA, DECOR_COLLECTION_MASTER_PDA, DECOR_COLLECTION_METADATA_PDA, DECOR_COLLECTION_MINT_PDA, PET_COLLECTION_MASTER_PDA, PET_COLLECTION_METADATA_PDA, PET_COLLECTION_MINT_PDA } from "@/app/utils/pda-constants";
import { ASSET_COLLECTION_MINT_SEED, DECOR_COLLECTION_MINT_SEED, PET_COLLECTION_MINT_SEED } from "@/app/utils/constants";
import { CreateToken } from "../shareable/tokens/CreateToken";
import { PutToken } from "./PutToken";


export const ProgramConfiguration: FC = ()  => {
    return (
        <div>
            <h1 className="mb-8 text-3xl">Configuration</h1>
            <Tabs variant={'solid'} radius={'md'} title="Program configuration">
                <Tab title="Pet collection configuration">
                    <PutCollection
                        targetCollection='petCollection'
                        metadataOptions={{
                            mintPda: PET_COLLECTION_MINT_PDA,
                            metadataPda: PET_COLLECTION_METADATA_PDA,
                            masterEditionPda: PET_COLLECTION_MASTER_PDA,
                            mintSeed: PET_COLLECTION_MINT_SEED,
                        }}
                    ></PutCollection>
                </Tab>
                <Tab title="Decor collection configuration">
                    <PutCollection
                        targetCollection='decorCollection'
                        metadataOptions={{
                            mintPda: DECOR_COLLECTION_MINT_PDA,
                            metadataPda: DECOR_COLLECTION_METADATA_PDA,
                            masterEditionPda: DECOR_COLLECTION_MASTER_PDA,
                            mintSeed: DECOR_COLLECTION_MINT_SEED,
                        }}
                    ></PutCollection>
                </Tab>
                <Tab title="Asset collection configuration">
                    <PutCollection
                        targetCollection='assetCollection'
                        metadataOptions={{
                            mintPda: ASSET_COLLECTION_MINT_PDA,
                            metadataPda: ASSET_COLLECTION_METADATA_PDA,
                            masterEditionPda: ASSET_COLLECTION_MASTER_EDITION_PDA,
                            mintSeed: ASSET_COLLECTION_MINT_SEED,
                        }}
                    ></PutCollection>
                </Tab>
                <Tab title="Token configuration">
                    <PutToken>
                    </PutToken>
                </Tab>
            </Tabs>
        </div>
    );
}