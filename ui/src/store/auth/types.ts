import { AnchorWallet } from "@solana/wallet-adapter-react";

export interface AuthState {
  walletInfo?: AnchorWallet;
}

export enum AuthActionTypes {
  SET_WALLET_ADDRESS = "SET_WALLET_ADDRESS",
}
