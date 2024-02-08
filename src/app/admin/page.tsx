'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAdmin } from '@/app/shareable/hooks/useIsAdmin';
import { CircularProgress } from '@nextui-org/react';
import { ProgramConfiguration } from './components/ProgramConfiguration';
import { useAnchor } from '../shareable/providers/AnchorContextProvider';
import { Initialization } from './components/Initialization';
import { Program } from '@coral-xyz/anchor';
import { Petai } from '../types/petai';
import { v4 } from 'uuid';

export default function AdminPage() {
  const isAdmin = useIsAdmin();
  const router = useRouter();
  const { program } = useAnchor();
  const [isLoading, setIsLoading] = useState(true);
  const [isStateInitialized, setIsStateInitialized] = useState(false);

  useLayoutEffect(() => {
    if (!isAdmin) {
      router.replace('/');
    }
  }, [isAdmin, router]);

  useEffect(() => {
    isProgramInitialized(program);
  }, [program]);

  const isProgramInitialized = async (program: Program<Petai> | null) => {
    if (!program) {
      return;
    }

    const state = await program.account.programState.all();

    if (state.length) {
      setIsStateInitialized(true);
    }

    setIsLoading(false);
  };

  const programInitedCb = () => {
    setIsStateInitialized(true);
  };

  if (isLoading || !isAdmin) {
    return (
      <div className="max-w-screen-lg m-auto py-5">
        <CircularProgress size="lg" aria-label="Loading..." />
      </div>
    );
  }

  if (!isStateInitialized) {
    return (
      <div className="max-w-screen-lg m-auto py-5">
        <Initialization initedCb={programInitedCb} />
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg m-auto py-5">
      <div className="py-4 mb-4">
        <ProgramConfiguration />
      </div>
    </div>
  );
}