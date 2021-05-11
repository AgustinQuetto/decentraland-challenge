import { ethers } from "ethers";
import { push } from "connected-react-router";
import { callGetAccounts } from "../calls";
import { put, call, select, takeLatest } from "redux-saga/effects";
import { actions, setProvider, setAccounts, pageLoading } from "../actions";

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

function* getAccounts() {
  try {
    const { provider } = yield select(getAppStore);
    const accounts = yield call(callGetAccounts, provider);
    yield put(setAccounts({ accounts }));
    yield;
  } catch (e) {
    console.error(e);
  }
}

function* getBalance({ payload }: any) {
  try {
    console.log("listening get balance saga");
    yield;
  } catch (e) {
    console.error(e);
  }
}

export default function* manager() {
  yield takeLatest(actions.INIT_PROVIDER, initProvider);
  yield takeLatest(actions.SET_PROVIDER, setProvider);
  yield takeLatest(actions.GET_ACCOUNTS, getAccounts);
  yield takeLatest(actions.SET_ACCOUNTS, setAccounts);
  yield takeLatest(actions.GET_BALANCE, getBalance);
}
