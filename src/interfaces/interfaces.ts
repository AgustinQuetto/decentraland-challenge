import { BigNumberish } from "ethers";

export interface History {
  blockHash?: string;
  blockNumber?: number;
  from?: string;
  to?: string;
  method?: any;
  type?: any;
  timestamp?: number;
  value: BigNumberish;
  gasPrice?: BigNumberish;
  gasLimit: BigNumberish;
  transaction?: object;
}

export interface IinitStorageState {
  pageLoading: boolean;
  provider: boolean;
  signer: boolean;
  accounts: string[];
  balances: { [key: string]: number };
  history: {};
  messages: {
    transaction: { status: boolean; value: string };
  };
  transfer: {
    from: string;
    to: string;
  };
  alert: {
    open: boolean;
    title: string;
    content: string;
  };
  transferOpen: boolean;
}

export interface ITransactionData {
  from: string;
  to: string;
  amount: string;
}
