import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export interface NftOptionsInput {
    name: string;
    symbol: string;
    uri: string;
    creator: PublicKey;
}

export const getNftCollectionOptions = (options: NftOptionsInput): any => {
    return {
        name: options.name,
        symbol: options.symbol,
        uri: options.uri,
        tokenStandart: {
            nonFungible: {}
        },
        primarySaleHappened: false,
        collection: null,
        collectionDetails: {
            v1: { size: new BN(0) }
        },
        decimals: null,
        printSupply: {
            zero: {}
        },
        creators: [{
            address: options.creator,
            verified: true,
            share: 100
        }]
    };
};
