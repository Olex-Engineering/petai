import { web3 } from "@coral-xyz/anchor";
import { PROGRAM_STATE_SEED, PROGRAM_ID, TOKEN_MINT_SEED, PET_COLLECTION_MINT_SEED, MPL_TOKEN_METADATA_PROGRAM_ID, ASSET_COLLECTION_MINT_SEED, ASSET_TEST_MINT_SEED, ASSET_STATE_SEED, PLAYER_STATE_SEED, PET_NFT_MINT_SEED, ADMIN_KEY, DECOR_COLLECTION_MINT_SEED, DECOR_STATE_SEED } from "./constants";


export const [PROGRAM_STATE_PDA, PROGRAM_STATE_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from(PROGRAM_STATE_SEED)],
    PROGRAM_ID
  )

export const [TOKEN_MINT_PDA, TOKEN_MINT_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from(TOKEN_MINT_SEED)],
    PROGRAM_ID
  )

// Pet pda's
export const [PET_COLLECTION_MINT_PDA, PET_COLLECTION_MINT_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from(PET_COLLECTION_MINT_SEED), ADMIN_KEY.toBuffer()],
    PROGRAM_ID
  )

export const [PET_COLLECTION_METADATA_PDA, PET_COLLECTION_METADATA_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      PET_COLLECTION_MINT_PDA.toBuffer()
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID
  )

export const [PET_COLLECTION_MASTER_PDA, PET_COLLECTION_MASTER_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      PET_COLLECTION_MINT_PDA.toBuffer(),
      Buffer.from('edition')
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID
  );


// Asset pda's
export const [ASSET_COLLECTION_MINT_PDA, ASSET_COLLECTION_MINT_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from(ASSET_COLLECTION_MINT_SEED), ADMIN_KEY.toBuffer()],
    PROGRAM_ID
  )

export const [ASSET_COLLECTION_METADATA_PDA, ASSET_COLLECTION_METADATA_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      ASSET_COLLECTION_MINT_PDA.toBuffer()
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID
  )

export const [ASSET_COLLECTION_MASTER_EDITION_PDA, ASSET_COLLECTION_MASTER_EDITION_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      ASSET_COLLECTION_MINT_PDA.toBuffer(),
      Buffer.from('edition')
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID
  );

// Decor pda's
export const [DECOR_COLLECTION_MINT_PDA, DECOR_COLLECTION_MINT_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
  [Buffer.from(DECOR_COLLECTION_MINT_SEED), ADMIN_KEY.toBuffer()],
  PROGRAM_ID
)

export const [DECOR_COLLECTION_METADATA_PDA, DECOR_COLLECTION_METADATA_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
  [
    Buffer.from('metadata'),
    MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    DECOR_COLLECTION_MINT_PDA.toBuffer()
  ],
  MPL_TOKEN_METADATA_PROGRAM_ID
)

export const [DECOR_COLLECTION_MASTER_PDA, DECOR_COLLECTION_MASTER_PDA_BUMP] = web3.PublicKey.findProgramAddressSync(
  [
    Buffer.from('metadata'),
    MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    DECOR_COLLECTION_MINT_PDA.toBuffer(),
    Buffer.from('edition')
  ],
  MPL_TOKEN_METADATA_PROGRAM_ID
);

export const getTokenMintPda = (seed: string): [web3.PublicKey, number] => {
  return web3.PublicKey.findProgramAddressSync(
      [Buffer.from(seed), ADMIN_KEY.toBuffer()],
      PROGRAM_ID
    );
}

export const getTokenMetadataPda = (seed: string): [web3.PublicKey, number] => {
  return web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        getTokenMintPda(seed)[0].toBuffer()
      ],
      MPL_TOKEN_METADATA_PROGRAM_ID
    );
}

export const getAssetStatePda = (tokenMint: web3.PublicKey): [web3.PublicKey, number] => {
  return web3.PublicKey.findProgramAddressSync(
    [Buffer.from(ASSET_STATE_SEED), tokenMint.toBuffer()],
    PROGRAM_ID
  )
}

export const getDecorStatePda = (tokenMint: web3.PublicKey): [web3.PublicKey, number] => {
  return web3.PublicKey.findProgramAddressSync(
    [Buffer.from(DECOR_STATE_SEED), tokenMint.toBuffer()],
    PROGRAM_ID
  )
}

// Player and pet nft pda's
export const getPlayerPda = (userPublicKey: web3.PublicKey): [web3.PublicKey, number] => {
  return web3.PublicKey.findProgramAddressSync(
      [Buffer.from(PLAYER_STATE_SEED), userPublicKey.toBuffer()],
      PROGRAM_ID
    );
}

export const getPetNFTMintPda = (userPublicKey: web3.PublicKey): [web3.PublicKey, number] => {
    return web3.PublicKey.findProgramAddressSync(
        [Buffer.from(PET_NFT_MINT_SEED), userPublicKey.toBuffer()],
        PROGRAM_ID
      );
}

export const getPetMetadataPda = (userPublicKey: web3.PublicKey): [web3.PublicKey, number] => {
    return web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          getPetNFTMintPda(userPublicKey)[0].toBuffer()
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
      );
}

export const getPetMasterEdition = (userPublicKey: web3.PublicKey): [web3.PublicKey, number] => {
    return web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from('metadata'),
            MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            getPetNFTMintPda(userPublicKey)[0].toBuffer(),
            Buffer.from('edition')
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
    )
}