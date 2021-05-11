import { put, call, select, takeLatest } from "redux-saga/effects";
import { actions, setProvider, pageLoading } from "../actions";
import { ethers } from "ethers";

function* initProvider() {
  try {
    if (window.ethereum) {
      yield put(pageLoading());
      yield call(window.ethereum.enable);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      yield put(setProvider({ provider, signer }));
      yield put(pageLoading());
    } else {
      alert("This site needs Metamask.");
    }
  } catch (e) {
    console.log(e);
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
  yield takeLatest(actions.GET_BALANCE, getBalance);
}
