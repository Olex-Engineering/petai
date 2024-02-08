'use client';
import { FC } from 'react';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import { useIsAdmin } from '@/app/hooks/useIsAdmin';
import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const AppHeader: FC = () => {
  const isAdmin = useIsAdmin();

  return (
    <Navbar>
      <NavbarContent justify={'center'}>
        { isAdmin &&
          <NavbarItem>
            <Link href={'/admin'}>
              Admin panel
            </Link>
          </NavbarItem>
        }
      </NavbarContent>
      <NavbarContent justify={'end'}>
        <NavbarItem>
          <WalletMultiButtonDynamic className={'test-button-wallet'}></WalletMultiButtonDynamic>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}