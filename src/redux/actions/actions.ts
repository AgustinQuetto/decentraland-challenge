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
