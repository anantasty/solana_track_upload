import { Reducer } from "redux";

import { AppState, ActionTypes } from "./types";

const initialState: AppState = {
  //walletAddress: localStorage.getItem("walletAddress"),
  walletInfo: {},
  myTracks: [],
  allTracks: []
};

export const appReducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_WALLET_ADDRESS: {
      return {
        ...state,
        walletInfo: action.payload,
      };
    }
    case ActionTypes.SET_ALL_TRACKS: {
      return {
        ...state,
        allTracks: action.payload
      }
    }
    case ActionTypes.SET_MY_TRACKS: {
      return {
        ...state,
        myTracks: action.payload
      }
    }
    default: {
      return { ...state };
    }
  }
};

