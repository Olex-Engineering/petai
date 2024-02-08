'use client';

import { FC } from "react";
import { PetNextUIProvider } from "./NextUIProvider";
import { UmiContextProvider } from "./UmiContextProvider";
import { WalletContextProvider } from "./WalletContextProvider";
import config from '@/amplifyconfiguration.json';

import { Amplify } from 'aws-amplify';
import { AnchorContextProvider } from "./AnchorContextProvider";
Amplify.configure(config, { ssr: true });

export const GlobalProvider: FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <PetNextUIProvider>
          <WalletContextProvider>
            <UmiContextProvider>
              <AnchorContextProvider>
                {children}
              </AnchorContextProvider>
            </UmiContextProvider>
          </WalletContextProvider>
        </PetNextUIProvider>
    )
}