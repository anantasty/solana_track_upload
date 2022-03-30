import { ActionTypes, WalletInfo } from "./types";
import { ThunkAction } from "redux-thunk";
import { ActionCreator, Action, Dispatch } from "redux";
import { ApplicationState } from "../index";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Track } from "../../contract/track_model";

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const setWalletAddress = async (walletInfo?: WalletInfo) => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypes.SET_WALLET_ADDRESS,
      payload: walletInfo,
    });
  };
};

export const setAllTracks: AppThunk = (tracks: Track[]) => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypes.SET_ALL_TRACKS,
      payload: tracks,
    });
  };
};

export const setMyTracks: AppThunk = (tracks: Track[]) => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypes.SET_MY_TRACKS,
      payload: tracks,
    });
  };
};