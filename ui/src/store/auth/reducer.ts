import { Reducer } from "redux";

import { AuthState, AuthActionTypes } from "./types";

const initialState: AuthState = {
  //walletAddress: localStorage.getItem("walletAddress"),
  walletInfo: {},
};

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_WALLET_ADDRESS: {
      return {
        ...state,
        walletInfo: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export { reducer as authReducer };
