import { createBrowserHistory } from "history";
import {
  RouterState,
  connectRouter,
  routerMiddleware,
  CallHistoryMethodAction,
} from "connected-react-router";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { ThunkDispatch as OldThunkDispatch } from "redux-thunk";
import { ICampaignActions} from "./Campaign/actions"
import { ICampaignState } from "./Campaign/state"
import { campaignReducers } from "./Campaign/reducers";

export const history = createBrowserHistory();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export interface IRootState {
  campaign: ICampaignState;
  router: RouterState;
}

export const rootReducers = combineReducers<IRootState>({
  campaign: campaignReducers,
  router: connectRouter(history),
});

export type ThunkDispatch = OldThunkDispatch<IRootState, null, IRootAction>;
export type IRootAction =  CallHistoryMethodAction | ICampaignActions

export default createStore<IRootState, IRootAction, {}, {}>(
  rootReducers,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
)