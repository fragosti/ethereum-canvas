require('dotenv').config();

var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten:  {
      network_id: 3,
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/"+process.env.INFURA_TOKEN)
      },
      gasPrice: "20000000000", // 20 gwei
      gas: "2900000", 
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://mainnet.infura.io/"+process.env.INFURA_TOKEN)
      },
      network_id: 1, // Only mainnet
      gasPrice: "20000000000", // 20 gwei
      gas: "2900000", 
    }
  }
};
