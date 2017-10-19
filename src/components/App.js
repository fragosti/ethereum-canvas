import React, { Component } from 'react';
import { modularScale } from 'polished';
// import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
// import getWeb3 from '../utils/getWeb3';
import { Flex, Box } from 'grid-styled';

import { colors } from '../style/utils';
import Header from './Header';
import Canvas from './Canvas';

const MainFlex = Flex.extend`
  background-color: ${colors.grayBackground};
`;

class App extends Component {


  // componentWillMount() {
  //   // Get network provider and web3 instance.
  //   // See utils/getWeb3 for more info.

  //   getWeb3
  //   .then(results => {
  //     this.setState({
  //       web3: results.web3
  //     })
  //     // Instantiate contract once web3 provided.
  //     this.instantiateContract()
  //   })
  //   .catch(() => {
  //     console.log('Error finding web3.')
  //   })
  // }

  // instantiateContract() {
  //   /*
  //    * SMART CONTRACT EXAMPLE
  //    *
  //    * Normally these functions would be called in the context of a
  //    * state management library, but for convenience I've placed them here.
  //    */

  //   const contract = require('truffle-contract')
  //   const simpleStorage = contract(SimpleStorageContract)
  //   simpleStorage.setProvider(this.state.web3.currentProvider)

  //   // Declaring this for later so we can chain functions on SimpleStorage.
  //   var simpleStorageInstance

  //   // Get accounts.
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     simpleStorage.deployed().then((instance) => {
  //       simpleStorageInstance = instance

  //       // Stores a given value, 5 by default.
  //       return simpleStorageInstance.set(5, {from: accounts[0]})
  //     }).then((result) => {
  //       // Get the value from the contract to prove it worked.
  //       return simpleStorageInstance.get.call(accounts[0])
  //     }).then((result) => {
  //       // Update state with the result.
  //       return this.setState({ storageValue: result.c[0] })
  //     })
  //   })
  // }

  render() {
    return (
      <div> 
        <Header/>
        <MainFlex justify='center' is='main'> 
          <Box is='section' m={modularScale(1)}>
            <Canvas/>
          </Box>
        </MainFlex>
      </div>
    );
  }
}

export default App
