export const actions = {
  INIT_PROVIDER: "INIT_PROVIDER",
  SET_PROVIDER: "SET_PROVIDER",
  PAGE_LOADING: "PAGE_LOADING",
  GET_BALANCE: "GET_BALANCE",
  SET_BALANCE: "SET_BALANCE",
  GET_ACCOUNTS: "GET_ACCOUNTS",
  SET_ACCOUNTS: "SET_ACCOUNTS",
  GET_HISTORY: "GET_HISTORY",
  SET_HISTORY: "SET_HISTORY",
  TRANSFER_TOGGLE: "TRANSFER_TOGGLE",
  TRANSFER_TOGGLE_UPDATE: "TRANSFER_TOGGLE_UPDATE",
  SEND_TRANSACTION: "SEND_TRANSACTION",
  SET_MESSAGE: "SET_MESSAGE",
  SET_ALERT: "SET_ALERT",
};

export const pageLoading = () => ({
  type: actions.PAGE_LOADING,
});

export const initProvider = () => ({
  type: actions.INIT_PROVIDER,
});

export const setProvider = (payload) => ({
  type: actions.SET_PROVIDER,
  ...payload,
});

export const getBalance = (address: string) => ({
  type: actions.GET_BALANCE,
  address,
});

export const setBalance = (payload: any) => ({
  type: actions.SET_BALANCE,
  ...payload,
});

export const getAccounts = (includeBalances) => ({
  type: actions.GET_ACCOUNTS,
  includeBalances,
});

export const setAccounts = (payload: any) => ({
  type: actions.SET_ACCOUNTS,
  ...payload,
});

export const getHistory = (address: string, includeReceipt?: boolean) => {
  return {
    type: actions.GET_HISTORY,
    address,
    includeReceipt,
  };
};

export const setHistory = (payload: any) => ({
  type: actions.SET_HISTORY,
  ...payload,
});

export const transferToggle = (account: string) => ({
  type: actions.TRANSFER_TOGGLE,
  account: account,
});

export const transferToggleUpdate = (account?: string) => ({
  type: actions.TRANSFER_TOGGLE_UPDATE,
  account: account,
});

export const sendTransaction = (payload: any) => ({
  type: actions.SEND_TRANSACTION,
  ...payload,
});

export const setMessage = (payload: any) => ({
  type: actions.SET_MESSAGE,
  ...payload,
});

export const setAlert = (payload: any) => ({
  type: actions.SET_ALERT,
  ...payload,
});
