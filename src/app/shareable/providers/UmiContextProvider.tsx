'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createContext, FC, ReactNode } from 'react';
import { RPC_URL } from '@/app/utils/constants';
import { Umi } from '@metaplex-foundation/umi';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';

export const UmiContext = createContext<Umi | null>(null);

export const UmiContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallet = useWallet();

  const umi = createUmi(RPC_URL)
    .use(
      walletAdapterIdentity(wallet)
    )
    .use(
      mplTokenMetadata()
    );

  return (
    <UmiContext.Provider value={umi}>
      {children}
    </UmiContext.Provider>
  )
}