import { ethers } from "ethers";

type TransactionResponseReceipt = ethers.Transaction & {
  receipt?: any;
};

export const GetAccounts = async (provider) => {
  const accounts = await provider.listAccounts();
  return accounts;
};

export const GetBalances = async (provider, addresses) => {
  const balancesPromises = addresses.map((address) =>
    GetBalance(provider, address)
  );
  const balances = await Promise.all(balancesPromises);
  return balances;
};

export const GetBalance = async (provider, address) => {
  const _balance = await provider.getBalance(address);
  const balance = ethers.utils.formatEther(_balance);
  return balance;
};

export const GetHistory = async (address, includeReceipt) => {
  const provider = new ethers.providers.EtherscanProvider();
  const history = await provider.getHistory(address);

  if (includeReceipt) {
    const receipts = history.map((transaction) =>
      GetTransactionReceipt(transaction.hash)
    );
    const receiptsResolved = await Promise.all(receipts);
    const historyWithTransactionReceipt: Array<TransactionResponseReceipt> =
      history.map((transaction: ethers.Transaction, i) => {
        let tmpTransaction = transaction as TransactionResponseReceipt;
        tmpTransaction.receipt = receiptsResolved[i];
        return tmpTransaction;
      });

    return historyWithTransactionReceipt;
  }

  return history;
};

export const GetTransactionReceipt = async (transactionHash) => {
  let provider = new ethers.providers.EtherscanProvider();
  const txReceipt = await provider.getTransactionReceipt(transactionHash);
  if (txReceipt && txReceipt.blockNumber) {
    return txReceipt;
  }
  return {};
};

export const sendTransaction = async (provider, { from, to, amount }) => {
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
