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
