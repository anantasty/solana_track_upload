import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { Track } from "../../contract/track_model";

export interface WalletInfo {
  connection?: anchor.web3.Connection,
  walletAddress?: anchor.web3.PublicKey,
  wallet?: AnchorWallet
}


export interface AppState {
  walletInfo?: WalletInfo;
  program?: anchor.Program,
  allTracks?: Track[],
  myTracks?: Track[]
}


export enum ActionTypes {
  SET_WALLET_ADDRESS = "SET_WALLET_ADDRESS",
  SET_MY_TRACKS = "SET_MY_TRCKS",
  SET_ALL_TRACKS = "SET_ALL_TRCKS",
}
