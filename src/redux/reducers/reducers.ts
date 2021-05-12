import { actions } from "../actions";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const initStorageState = {
  pageLoading: false,
  provider: false,
  signer: false,
  accounts: [],
  balances: {},
  history: {},
};

const reducers = (state = initStorageState, action) => {
  switch (action.type) {
    case actions.PAGE_LOADING:
      return { ...state, pageLoading: !state.pageLoading };
    case actions.SET_PROVIDER:
    case actions.SET_ACCOUNTS:
    case actions.SET_BALANCE:
      return {
        ...state,
        ...action,
      };
    case actions.SET_HISTORY:
      return { ...state, history: { ...state.history, ...action.history } };

    default:
      return state;
  }
};

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app: reducers,
  });

export default createRootReducer;
