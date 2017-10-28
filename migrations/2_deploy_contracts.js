var EthereumCanvas = artifacts.require("./EthereumCanvas.sol");

module.exports = function(deployer) {
  deployer.deploy(EthereumCanvas);
};
