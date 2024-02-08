'use client';

import { Petai } from "@/app/types/petai";
import { PROGRAM_ID } from "@/app/utils/constants";
import { AnchorProvider, Program, Provider } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import idl from "@/../petai.json";

export interface AnchorContext {
    provider: AnchorProvider | null,
    program: Program<Petai> | null
}

export const AnchorContext = createContext<AnchorContext | null>(null);

export const useAnchor = () => useContext(AnchorContext)!;

export const AnchorContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const [provider, setProvider] = useState<AnchorProvider | null>(null);
    const [program, setProgram] = useState<Program<Petai> | null>(null);

    useEffect(() => {
        if (!wallet) {
          setProvider(null);
          setProgram(null);
          return;
        }

        const provider =  new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
        const program = new Program<Petai>(idl as unknown as Petai, PROGRAM_ID, provider);
        setProvider(provider);
        setProgram(program);
    }, [wallet, connection]);

  return (
    <AnchorContext.Provider value={{ program: program, provider: provider }}>
      {children}
    </AnchorContext.Provider>
  )
}