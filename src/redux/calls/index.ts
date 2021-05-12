import { ethers } from "ethers";

type TransactionResponseReceipt = ethers.Transaction & {
  receipt?: any;
};

const calls = {
  GetAccounts: async (provider) => {
    const accounts = await provider.listAccounts();
    return accounts;
  },
  GetBalances: async (provider, addresses) => {
    const balancesPromises = addresses.map((address) =>
      calls.GetBalance(provider, address)
    );
    const balances = await Promise.all(balancesPromises);
    return balances;
  },
  GetBalance: async (provider, address) => {
    const _balance = await provider.getBalance(address);
    const balance = ethers.utils.formatEther(_balance);
    return balance;
  },
  GetHistory: async (address, includeReceipt) => {
    const provider = new ethers.providers.EtherscanProvider();
    const history = await provider.getHistory(address);

    if (includeReceipt) {
      const receipts = history.map((transaction) =>
        calls.GetTransactionReceipt(transaction.hash)
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
  },
  GetTransactionReceipt: async (transactionHash) => {
    let provider = new ethers.providers.EtherscanProvider();
    const txReceipt = await provider.getTransactionReceipt(transactionHash);
    if (txReceipt && txReceipt.blockNumber) {
      return txReceipt;
    }
    return {};
  },
};

export default calls;
