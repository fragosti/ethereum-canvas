import React, { Component } from 'react';
import { modularScale } from 'polished';
import getContract from '../utils/getContract';
import { Flex, Box } from 'grid-styled';

import { TOOL_NONE } from '../tools';
import { colors } from '../style/utils';
import { diff } from '../utils/image';
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
    selectedAccount: null,
    selectedOptions: null,
    drawThickness: 1,
  }

  componentWillMount() {
    getContract().then((contract) => {
      window.contract = contract;

      // contract.getPixels.call().then(console.log)
    })
  }

  claimPixels = () => {
    const { selectedAccount } = this.state;
    const stagingContext = document.getElementById('staging-canvas').getContext('2d');
    const mainContext = document.getElementById('main-canvas').getContext('2d');
    const { xs, ys, colors } = diff(mainContext, stagingContext);
    console.log(xs, ys, colors);
    return getContract().then((contract) => {
      return contract.colorPixels(xs, ys, colors, { 
        // TODO: Calculate value & gas
        value: 100000000000000000,
        gas: 6385876,
        from: selectedAccount
      }).then(console.log);
    });
  }

  changeSetting = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { selectedColor, selectedOptions, drawThickness, selectedTool, selectedAccount } = this.state;
    return (
      <div> 
        <Header/>
        <MainFlex align='center' justify='center' is='main' direction='column'>
          <Box is='section' mt={modularScale(1)}>
            <Control
              selectedTool={selectedTool}
              selectedColor={selectedColor}
              selectedAccount={selectedAccount}
              selectedOptions={selectedOptions}
              claimPixels={this.claimPixels}
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
