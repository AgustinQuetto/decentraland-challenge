import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { actions } from "../actions";

const initStorageState = {
  balance: 0,
  pageLoading: false,
  provider: false,
  signer: false,
};

const reducers = (state = initStorageState, action) => {
  switch (action.type) {
    case actions.SET_PROVIDER:
      return {
        ...state,
        ...action,
      };
    case actions.PAGE_LOADING:
      return { ...state, pageLoading: !state.pageLoading };
    default:
      return state;
  }
};

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });

export default createRootReducer;
