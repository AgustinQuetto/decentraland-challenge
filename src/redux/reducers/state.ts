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
    to: "",
  },
  alert: {
    open: false,
    title: "",
    content: "",
  },
  transferOpen: false,
};

export default initStorageState;
