import { ethers } from "ethers";
import { ITransactionData } from "../../interfaces";

//Ethers type Transaction with Receipt
type TransactionResponseReceipt = ethers.Transaction & {
  receipt?: any;
};

//Gets providers accounts
export const GetAccounts = async (provider): Promise<string[]> => {
  const accounts = await provider.listAccounts();
  return accounts;
};

//Get accounts balance
export const GetBalances = async (
  provider,
  addresses: string[]
): Promise<string[]> => {
  const balancesPromises = addresses.map((address) =>
    GetBalance(provider, address)
  );
  const balances = await Promise.all(balancesPromises);
  return balances;
};

//Get account balance
export const GetBalance = async (
  provider,
  address: String
): Promise<string> => {
  const _balance = await provider.getBalance(address);
  const balance = ethers.utils.formatEther(_balance);
  return balance;
};

//Gets account history and includes transaction receipt if required
export const GetHistory = async (
  address: string,
  includeReceipt: boolean
): Promise<
  ethers.providers.TransactionResponse[] | TransactionResponseReceipt[]
> => {
  const provider = new ethers.providers.EtherscanProvider();
  const history = await provider.getHistory(address);

  //include receipt if necessary by extending the transaction response interface
  if (includeReceipt) {
    const receipts = history.map((transaction) =>
      GetTransactionReceipt(transaction.hash)
    );
    const receiptsResolved = await Promise.all(receipts);
    const historyWithTransactionReceipt: TransactionResponseReceipt[] =
      history.map((transaction: ethers.Transaction, i) => {
        let tmpTransaction = transaction as TransactionResponseReceipt;
        tmpTransaction.receipt = receiptsResolved[i];
        return tmpTransaction;
      });

    return historyWithTransactionReceipt;
  }

  return history;
};

//Gets transaction receipt
export const GetTransactionReceipt = async (
  transactionHash: string
): Promise<ethers.providers.TransactionReceipt | object> => {
  let provider = new ethers.providers.EtherscanProvider();
  const txReceipt = await provider.getTransactionReceipt(transactionHash);
  if (txReceipt && txReceipt.blockNumber) {
    return txReceipt;
  }
  return {};
};

//Sends transaction between accounts
export const sendTransaction = async (
  provider,
  { from, to, amount }: ITransactionData
): Promise<string> => {
  const params = [
    {
      from: from,
      to: to,
      value: ethers.utils.parseUnits(amount, "ether").toHexString(),
    },
  ];

  const transactionHash = await provider.send("eth_sendTransaction", params);
  return transactionHash;
};
