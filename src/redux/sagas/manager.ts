import { ethers } from "ethers";
import { push } from "connected-react-router";
import calls from "../calls";
import { put, call, select, takeLatest } from "redux-saga/effects";
import {
  actions,
  setProvider,
  setAccounts,
  pageLoading,
  setHistory,
  setBalance,
} from "../actions";

const getAppStore = (state) => state.app;

function* initProvider() {
  try {
    if (window.ethereum) {
      yield put(pageLoading());
      yield call(window.ethereum.enable);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      yield put(setProvider({ provider, signer }));
      yield put(pageLoading());
      yield put(push("/accounts"));
    } else {
      alert("This site needs Metamask. Please install.");
    }
  } catch (e) {
    console.log(e);
  }
}

function* getAccounts(payload: any) {
  try {
    const { includeBalances } = payload;
    const { provider } = yield select(getAppStore);

    const accounts = yield call(calls.GetAccounts, provider);

    yield put(setAccounts({ accounts }));

    if (includeBalances) {
      const balances = yield call(calls.GetBalances, provider, accounts);
      const balancesByAddress = {};
      balances.map((balance, i) => (balancesByAddress[accounts[i]] = balance));

      yield put(setBalance({ balances: balancesByAddress }));
    }
  } catch (e) {
    console.error(e);
  }
}

function* getHistory(payload: any) {
  try {
    const { address, includeReceipt } = payload;
    const history = yield call(calls.GetHistory, address, includeReceipt);

    yield put(setHistory({ history: { [address]: history } }));
  } catch (e) {
    console.error(e);
  }
}

function* getBalance(payload: any) {
  try {
    console.log(payload);
    const { address } = payload;
    const { provider, balances } = yield select(getAppStore);

    const balance = yield call(calls.GetBalance, provider, address);

    balances[address] = balance;

    yield put(setBalance({ balances }));
  } catch (e) {
    console.error(e);
  }
}

export default function* manager() {
  yield takeLatest(actions.INIT_PROVIDER, initProvider);
  yield takeLatest(actions.SET_PROVIDER, setProvider);
  yield takeLatest(actions.GET_ACCOUNTS, getAccounts);
  yield takeLatest(actions.SET_ACCOUNTS, setAccounts);
  yield takeLatest(actions.GET_HISTORY, getHistory);
  yield takeLatest(actions.SET_HISTORY, setHistory);
  yield takeLatest(actions.GET_BALANCE, getBalance);
}
