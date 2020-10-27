import { createBrowserHistory } from "history";
import {
  RouterState,
  connectRouter,
  routerMiddleware,
  CallHistoryMethodAction,
} from "connected-react-router";
import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}


export interface IRootState {
  router: RouterState;
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducers = combineReducers<IRootState>({
  router: connectRouter(history),
});




export default createStore<IRootState, Action<any>, {}, {}>(
  rootReducers,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
)