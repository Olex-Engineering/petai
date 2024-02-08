import { useWallet } from '@solana/wallet-adapter-react';
import { ADMINS_WALLETS_PUB_KEYS } from '@/app/utils/constants';

export const useIsAdmin = () => {
  const { wallet } = useWallet();
  const walletPubKey = wallet?.adapter.publicKey?.toBase58();

  return !(!wallet?.adapter.connected || !walletPubKey || !ADMINS_WALLETS_PUB_KEYS.includes(walletPubKey));
}