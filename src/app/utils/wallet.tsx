// app/utils/solanaWallet.ts

import { PublicKey, Transaction, Connection } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";

export const connectWallet = async (wallet: WalletContextState) => {
  if (!wallet.connected) {
    await wallet.connect();
  }
};

export const getWalletPublicKey = (
  wallet: WalletContextState
): PublicKey | null => {
  return wallet.publicKey;
};

export const mintChest = async (
  wallet: WalletContextState,
  connection: Connection
) => {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error("Wallet not connected or missing capabilities");
  }

  // Implement minting logic here
  // For example, create a transaction that interacts with your smart contract

  // Placeholder transaction (does nothing)
  const transaction = new Transaction();

  // Sign and send the transaction
  const signedTransaction = await wallet.signTransaction(transaction);
  const txid = await connection.sendRawTransaction(
    signedTransaction.serialize()
  );
  await connection.confirmTransaction(txid);

  return txid;
};
