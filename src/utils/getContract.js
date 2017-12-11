import getWeb3 from './getWeb3';
import EthereumCanvasContract from '../../build/contracts/EthereumCanvas.json';
import TruffleContract from 'truffle-contract';

let contract;

const getContract = () => {
  if (contract) {
    return Promise.resolve(contract)
  }
  return getWeb3.then(({ web3 }) => {
    const canvasContract = TruffleContract(EthereumCanvasContract);
    canvasContract.setProvider(web3.currentProvider);
    return canvasContract.deployed().then((instance) => {
      contract = instance;
      return contract;
    });
  }).catch((e) => {
    console.error(e);
  });
}

export default getContract;