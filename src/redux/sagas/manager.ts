import calls from "../calls";
import { ethers } from "ethers";
import { push } from "connected-react-router";
import { put, all, call, select, takeLatest } from "redux-saga/effects";
import {
  actions,
  setProvider,
  setAccounts,
  pageLoading,
  setHistory,
  setBalance,
  getBalance as _getBalance,
  transferToggleUpdate,
  setMessage,
  setAlert,
} from "../actions";

const getAppStore = (state) => state.app;

//Initialize ethers.js and get access to Metamask as a provider
function* initProvider() {
  try {
    if (window.ethereum) {
      yield all([put(pageLoading()), call(window.ethereum.enable)]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      yield all([
        put(setProvider({ provider, signer })),
        put(pageLoading()),
        put(push("/accounts")),
      ]);
    } else {
      alert("This site needs Metamask. Please install.");
    }
  } catch (e) {
    console.error(e);
  }
}

//Get all Metamask accounts
function* getAccounts(payload: any) {
  try {
    const { includeBalances } = payload;
    const { provider } = yield select(getAppStore);

    const accounts = yield call(calls.GetAccounts, provider);

    yield put(setAccounts({ accounts }));

    //includes balances if required
    if (includeBalances) {
      const balances = yield call(calls.GetBalances, provider, accounts);

      //Create an object mapped with the account ID to avoid search iterations in rendering
      const balancesByAddress = {};
      balances.map((balance, i) => (balancesByAddress[accounts[i]] = balance));

      yield put(setBalance({ balances: balancesByAddress }));
    }
  } catch (e) {
    console.error(e);
  }
}

//Gets account history
function* getHistory(payload: any) {
  try {
    const { address, includeReceipt } = payload;
    const history = yield call(calls.GetHistory, address, includeReceipt);

    yield put(setHistory({ history: { [address]: history } }));
  } catch (e) {
    console.error(e);
  }
}

//Gets account current balance
function* getBalance(payload: any) {
  try {
    const { address } = payload;
    const { provider, balances } = yield select(getAppStore);

    const balance = yield call(calls.GetBalance, provider, address);

    balances[address] = balance;
    yield put(setBalance({ balances }));
  } catch (e) {
    console.error(e);
  }
}

//Show/hide transfer component state
function* _transferToggle(payload: any) {
  try {
    const { account, to } = payload;
    yield put(transferToggleUpdate(account, to));
  } catch (e) {
    console.error(e);
  }
}

//Send transfer from one account to another
function* sendTransaction(payload: any) {
  try {
    yield put(
      setMessage({
        transaction: {
          status: false,
          value: ``,
        },
      })
    );
    const { provider, transfer } = yield select(getAppStore);
    const { from } = transfer;
    const { to, amount } = payload;

    const transactionHash = yield call(calls.sendTransaction, provider, {
      from: from,
      to,
      amount,
    });

    //Transaction success
    if (transactionHash) {
      const alertData = {
        open: true,
        title: "Congratulations!",
        content: `You have transferred ${amount} ETH to account: ${to}.\nYour transaction id: ${transactionHash}.`,
        customClose: () => {},
      };

      const messageData = {
        transaction: {
          status: true,
          value: ``,
        },
      };

      yield all([
        put(transferToggleUpdate("")),
        put(_getBalance(from)),
        put(setMessage(messageData)),
        put(setAlert(alertData)),
      ]);
    }
  } catch (e) {
    console.error(e);
    yield put(setMessage({ transaction: { status: false, value: e.message } }));
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
  yield takeLatest(actions.TRANSFER_TOGGLE, _transferToggle);
  yield takeLatest(actions.SEND_TRANSACTION, sendTransaction);
}
