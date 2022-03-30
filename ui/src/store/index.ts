import { combineReducers, createStore } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { AppState } from "./auth/types";
import { appReducer } from "./auth/reducer";

export interface ApplicationState {
  auth: AppState;
  router: RouterState | any;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    auth: appReducer,
    router: connectRouter(history),
  });
  