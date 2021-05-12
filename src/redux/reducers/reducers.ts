import { actions } from "../actions";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { IinitStorageState } from "../../interfaces";

const initStorageState: IinitStorageState = {
  pageLoading: false,
  provider: false,
  signer: false,
  accounts: [],
  balances: {},
  history: {},
  messages: {
    transaction: { status: true, value: "" },
  },
  transfer: {
    from: "",
  },
  alert: {
    open: false,
    title: "",
    content: "",
  },
  transferOpen: false,
};

const reducers = (state = initStorageState, action) => {
  switch (action.type) {
    case actions.PAGE_LOADING:
      return { ...state, pageLoading: !state.pageLoading };
    case actions.SET_MESSAGE:
      return { ...state, messages: { ...state.messages, ...action } };
    case actions.TRANSFER_TOGGLE_UPDATE:
      const { account } = action;
      const transfer = state.transfer;
      if (account) {
        transfer.from = account;
      }
      return { ...state, transferOpen: !state.transferOpen, transfer };
    case actions.SET_HISTORY:
      return { ...state, history: { ...state.history, ...action.history } };
    case actions.SET_ALERT:
      return { ...state, alert: action };
    case actions.SET_PROVIDER:
    case actions.SET_ACCOUNTS:
    case actions.SET_BALANCE:
      console.log(action);
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
