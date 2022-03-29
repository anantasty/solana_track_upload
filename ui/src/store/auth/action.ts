import { AuthActionTypes } from "./types";
import { ThunkAction } from "redux-thunk";
import { ActionCreator, Action, Dispatch } from "redux";
import { ApplicationState } from "../index";

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const setWalletAddress: AppThunk = (walletInfo?: any) => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: AuthActionTypes.SET_WALLET_ADDRESS,
      payload: walletInfo,
    });
  };
};
