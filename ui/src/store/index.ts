import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { AuthState } from "./auth/types";
import { authReducer } from "./auth/reducer";

export interface ApplicationState {
  auth: AuthState;
  router: RouterState | any;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    auth: authReducer,
    router: connectRouter(history),
  });
