assetsFiltered.forEach((asset) => {
const transaction = new Transaction();

        if ((asset.metadata.tokenStandard as Some<TokenStandard>).value === TokenStandard.NonFungible) {
          return;
        }

        if (!asset) {
          return;
        }

        if (asset.mint.supply) {
          return;
        }

        console.log(asset);
        console.log(wallet.adapter.publicKey?.toBase58());
        const mintPublicKey = new PublicKey(asset.mint.publicKey);
        const to = getAssociatedTokenAddressSync(mintPublicKey, wallet.adapter.publicKey!);

        const createInst = createAssociatedTokenAccountInstruction(wallet.adapter.publicKey!, to, wallet.adapter.publicKey!, mintPublicKey);
        console.log(to.toBase58());
        console.log(mintPublicKey.toBase58());
        const mintToInstruction = createMintToInstruction(mintPublicKey, to, wallet.adapter.publicKey!, 1, [], TOKEN_PROGRAM_ID);

        transaction.add(createInst);
        transaction.add(mintToInstruction);
        wallet.adapter.sendTransaction(transaction, connection);
      });