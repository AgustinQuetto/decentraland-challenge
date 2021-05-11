export const callGetAccounts = async (provider) => {
  const accounts = await provider.listAccounts();
  return accounts;
};
