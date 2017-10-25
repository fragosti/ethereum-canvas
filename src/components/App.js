import React, { Component } from 'react';
import { modularScale } from 'polished';
// import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
// import getWeb3 from '../utils/getWeb3';
import { Flex, Box } from 'grid-styled';

import { TOOL_NONE } from '../tools';
import { colors } from '../style/utils';
import Header from './Header';
import Canvas from './Canvas';
import Footer from './Footer';
import Control from './Control';

const MainFlex = Flex.extend`
  background-color: ${colors.grayBackground};
`;

class App extends Component {

  state = {
    selectedTool: TOOL_NONE,
    selectedColor: colors.blue,
    drawThickness: 1,
  }
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

  getStagingCanvasPixels = () => {
    const context = document.getElementById('staging-canvas').getContext('2d')
    const image = context.getImageData(0, 0, 1000, 1000)
    console.log(image)
  }

  changeSetting = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { selectedColor, drawThickness, selectedTool } = this.state;
    return (
      <div> 
        <Header/>
        <MainFlex align='center' justify='center' is='main' direction='column'>
          <Box is='section' mt={modularScale(1)}>
            <Control
              selectedTool={selectedTool}
              selectedColor={selectedColor}
              claimPixels={this.getStagingCanvasPixels}
              drawThickness={drawThickness}
              onChange={this.changeSetting}
            />
          </Box>
          <Box is='section' m={modularScale(1)}>
            <Canvas
              tool={selectedTool}
              color={selectedColor}
              drawThickness={drawThickness}
            />
          </Box>
        </MainFlex>
        <Footer/>
      </div>
    );
  }
}

export default App
