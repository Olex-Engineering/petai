'use client';
import { FC } from 'react';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import { useIsAdmin } from '@/app/shareable/hooks/useIsAdmin';
import { usePathname } from 'next/navigation';
import { Button, Navbar, NavbarContent, NavbarItem, Link as UILink } from '@nextui-org/react';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const AppHeader: FC = () => {
  const isAdmin = useIsAdmin();
  const pathName = usePathname();

  const adminLinks = [
    {
      title: 'Configuration',
      href: '/admin',
    },
    {
      title: 'Assets',
      href: '/admin/assets',
    },
    {
      title: 'Decor',
      href: '/admin/decor',
    },
    {
      title: 'Pets templates',
      href: '/admin/pets-templates',
    },
    {
      title: 'Real pets',
      href: '/admin/real-pets',
    },
  ];

  return (
    <Navbar isBordered={true}>
      <NavbarContent justify={'center'}>
        { isAdmin && 
          <NavbarItem key={'admin'} isActive={pathName.includes('admin')}>
            <UILink as={Link} className='text-lg' href={'/admin'} color={'foreground'} aria-current={pathName.includes('admin') ? 'page' : false}>
              Admin {pathName.includes('admin') && ' |'}
            </UILink>
          </NavbarItem>
        }
        { isAdmin && pathName.includes('admin') && adminLinks.map((link) => (
          <NavbarItem key={link.href} isActive={pathName.includes(link.href)}>
            <UILink as={Link} className='text-sm' href={link.href} color={'foreground'} aria-current={pathName.includes(link.href) ? 'page' : false}>
              {link.title}
            </UILink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify={'end'}>
        <NavbarItem>
          <WalletMultiButtonDynamic className={'test-button-wallet'}></WalletMultiButtonDynamic>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}