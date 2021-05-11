import { actions } from "../actions";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const initStorageState = {
  pageLoading: false,
  provider: false,
  signer: false,
  accounts: [],
  balance: {},
};

const reducers = (state = initStorageState, action) => {
  switch (action.type) {
    case actions.PAGE_LOADING:
      return { ...state, pageLoading: !state.pageLoading };

    case actions.SET_PROVIDER:
    case actions.SET_ACCOUNTS:
      return {
        ...state,
        ...action,
      };

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
