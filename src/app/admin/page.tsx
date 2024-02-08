'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useLayoutEffect } from 'react';
import { ADMINS_WALLETS_PUB_KEYS } from '@/app/constants';
import { useRouter } from 'next/navigation';
import { useIsAdmin } from '@/app/hooks/useIsAdmin';

export default function AdminPage() {
  const isAdmin = useIsAdmin();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isAdmin) {
      router.back();
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return <main className={'min-h-screen'}>
      Loading...
    </main>;
  }

  return (
    <main className={'min-h-screen'}>
      <h1>Create Collection</h1>
      <h1>Create NFT</h1>
    </main>
  )
}