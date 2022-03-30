import { Store, createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import thunkMiddleware from "redux-thunk";
import { ApplicationState } from "./store";
import { createRootReducer } from "./store";

export default function configureStore(
    history: History,
    initialState: ApplicationState
): Store<ApplicationState> {
    const store = createStore(
        createRootReducer(history),
        initialState,
        applyMiddleware(routerMiddleware(history), thunkMiddleware)
    );
    return store;
};
