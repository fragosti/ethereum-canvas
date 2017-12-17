# ![ethereum-canvas](./public/logo.png?sanitize=true)
A decentralized app where you can save drawings onto the Ethereum blockchain.  Built using [truffle](http://truffleframework.com/) and React through the [react-box](https://github.com/truffle-box/react-box) truffle-box.

[Contract address on etherscan](https://etherscan.io/address/0xc1f8a8a43c4ccb3273ad03905a8d96f529dee8b6).
## How To Run
Dependencies
```
$ npm install -g truffle
$ npm install -g ethereumjs-testrpc
```
Compile contract
```
$ truffle compile
```
Deploy/migrate contract
```
$ truffle migrate
```
Run local ETH blockchain
```
$ testrpc
```
Run app
```
$ npm run start
```
Build app
```
$ npm run build
```
Deploy app
```
$ npm run deploy
```
Deploy smart contract
```
$ truffle migrate --network mainnet
```