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
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/bXkZ8meNbreNlaufUAkC")
      },
      gasPrice: "20000000000", // 20 gwei
      gas: "2900000", 
    },
    live: {
      host: "127.0.0.1",
      port: 8546,
      network_id: 1, // Only mainnet
      gasPrice: "20000000000", // 20 gwei
      gas: "4712388", 
    }
  }
};
