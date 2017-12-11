import getWeb3 from './getWeb3';

const getGasPrice = () => {
  return getWeb3.then(({web3}) => {
    return new Promise((resolve, reject) => {
      web3.eth.getGasPrice((error, price) => {
        if (error) {
          reject(error);
        }
        resolve(price);
      })
    })
  })
};

export default getGasPrice;