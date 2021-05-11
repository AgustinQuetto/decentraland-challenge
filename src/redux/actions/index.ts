export const actions = {
  INIT_PROVIDER: "INIT_PROVIDER",
  SET_PROVIDER: "SET_PROVIDER",
  PAGE_LOADING: "PAGE_LOADING",
  GET_BALANCE: "GET_BALANCE",
  GET_ACCOUNTS: "GET_ACCOUNTS",
};

export const pageLoading = () => ({
  type: actions.PAGE_LOADING,
});

export const initProvider = () => {
  return {
    type: actions.INIT_PROVIDER,
  };
};

export const setProvider = (payload) => ({
  type: actions.SET_PROVIDER,
  ...payload,
});

export const getBalance = (payload: object) => ({
  type: actions.GET_BALANCE,
  ...payload,
});

export const getAccounts = (payload: object) => ({
  type: actions.GET_ACCOUNTS,
  ...payload,
});
