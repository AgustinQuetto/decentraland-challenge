import { BigNumberish } from "ethers";

//Transaction History
export interface IHistory {
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

//Redux Storage
export interface IMessages {
  messages: {
    transaction: { status: boolean; value: string };
  };
}

export interface ITransfer {
  transferOpen?: boolean;
  transfer: {
    from: string;
    to: string;
  };
}

export interface IBalances {
  balances: { [key: string]: number };
}

export interface IInitStorageState extends IMessages, ITransfer, IBalances {
  pageLoading: boolean;
  provider: boolean;
  signer: boolean;
  accounts: string[];
  history: {};
  alert: {
    open: boolean;
    title: string;
    content: string;
  };
}

//Transfer
export interface ITransactionData {
  from: string;
  to: string;
  amount: string;
}
