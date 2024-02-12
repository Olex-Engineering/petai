import { web3 } from "@coral-xyz/anchor";

export const RPC_URL = 'http://localhost:8899';

// Solana
export const ADMIN_KEY = new web3.PublicKey('5eTTEunksXucBsP1hWcY8VFHhPvfZLxGLuAYron7EXT3');
export const PROGRAM_ID = new web3.PublicKey('47WMeQhwKsEr9RgTxiTupUJKtohL9Rd1A5GyemBqsbKH');
export const ADMINS_WALLETS_PUB_KEYS = ['5eTTEunksXucBsP1hWcY8VFHhPvfZLxGLuAYron7EXT3'];
export const PROGRAM_STATE_SEED = 'state';
export const TOKEN_MINT_SEED = 'token-mint'
export const PET_COLLECTION_MINT_SEED = 'pet-collection-mint-seed';
export const DECOR_COLLECTION_MINT_SEED = 'decor-collection-mint-seed';
export const ASSET_COLLECTION_MINT_SEED = 'asset-collection-mint-seed';
export const PLAYER_STATE_SEED = 'player-state';
export const ASSET_STATE_SEED = 'asset-state';
export const DECOR_STATE_SEED = 'decor-state';
export const PET_NFT_MINT_SEED = 'pet-nft-mint';
export const ASSET_TEST_MINT_SEED = 'asset-test-mint';
export const MPL_TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// AWS
export const BUCKET_URL = 'https://metadata182911-dev.s3.eu-central-1.amazonaws.com/public/';
export const BUCKET_IMAGES_NAME = 'images';
export const BUCKET_PET_TEMPLATES_NAME = 'pet-templates';
export const BUCKET_COLLECTION_METADATA_NAME = 'collection_metadata';
export const PET_TEMPLATES_API = 'https://ppka958fzj.execute-api.eu-central-1.amazonaws.com/dev/pet-templates';
export const REAL_PETS_API = 'https://ppka958fzj.execute-api.eu-central-1.amazonaws.com/dev/real-pets';

// CLIENT
export const DEFAULT_METADATA_SYMBOL = 'PETAI';
export const DEFAULT_TOKEN_NAME = 'PETAI';