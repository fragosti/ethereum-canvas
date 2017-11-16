import getWeb3 from './getWeb3';

const getAccounts = () => {
  return getWeb3.then(({ web3 }) => {
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          reject(error);
        }
        resolve(accounts);
      });
    })
  })
};

export default getAccounts;