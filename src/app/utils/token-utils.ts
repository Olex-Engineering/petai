import { PrintSupply } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";

export interface TokenOptionsInput {
    name: string;
    symbol: string;
    uri: string;
    collectionMint: PublicKey | null;
    creator: PublicKey;
    tokenType: TokenType;
    printSupply?: PrintSupply;
}

export interface TokenType {
    nonFungible?: {};
    fungibleAsset?: {};
    fungible?: {};
}


export const getTokenOptions = (options: TokenOptionsInput): any => {
    return {
        name: options.name,
        symbol: options.symbol,
        uri: options.uri,
        tokenStandart: options.tokenType || {
            fungibleAsset: {}
        },
        primarySaleHappened: false,
        collection: options.collectionMint ?  {
            key: options.collectionMint,
            verified: false
        } : null,
        collectionDetails: null,
        decimals: null,
        printSupply: options.printSupply || {
            zero: {}
        },
        creators: [{
            address: options.creator,
            verified: true,
            share: 100
        }]
    };
};