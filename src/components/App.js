import React, { Component } from 'react';
import { modularScale } from 'polished';
import getContract from '../utils/getContract';
import { Flex, Box } from 'grid-styled';

import { 
  TOOL_NONE,
} from '../tools';
import { colors } from '../style/utils';
import { range } from '../utils/array';
import { itemsToShapes, rawShapeToItem } from '../utils/shapes';
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
    selectedFill: colors.orange,
    drawThickness: 1,
    selectedAccount: null,
    selectedOptions: null,
    permanentItems: [],
    stagedItems: [],
  }

  componentWillMount() {
    getContract().then((contract) => {
      window.contract = contract;
      contract.getNumberOfShapes.call().then((length) => {
        range(Number(length)).forEach((i) => {
          contract.shapes.call(i).then((rawShape) => this.addPermanentItem(rawShapeToItem(rawShape)))
        })
      })
    })
  }

  claimPixels = () => {
    const { selectedAccount, stagedItems } = this.state;
    const {
      shapeIds,
      colors,
      fills,
      sizes,
      startXs,
      startYs,
      endXs,
      endYs,
    } = itemsToShapes(stagedItems);
    return getContract().then((contract) => {
      contract.drawShapes(shapeIds, colors, fills, sizes, startXs, startYs, endXs, endYs, {
        // TODO: Calculate value & gas.
        value: 100000000000000000,
        gas: 6385876,
        from: selectedAccount
      });
    });
  }

  addPermanentItem = (item) => {
    const newItems = this.state.permanentItems.concat(item);
    this.setState({ permanentItems: newItems });
  }

  addStagedItem = (item) => {
    console.log(item);
    const newItems = this.state.stagedItems.concat(item);
    this.setState({ stagedItems: newItems });
  }

  changeSetting = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { selectedColor, selectedFill, selectedOptions, drawThickness, selectedTool, selectedAccount, permanentItems } = this.state;
    return (
      <div> 
        <Header/>
        <MainFlex align='center' justify='center' is='main' direction='column'>
          <Box is='section' mt={modularScale(1)}>
            <Control
              selectedTool={selectedTool}
              selectedColor={selectedColor}
              selectedFill={selectedFill}
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
              fillColor={selectedFill}
              drawThickness={drawThickness}
              items={permanentItems}
              addItem={this.addStagedItem}
            />
          </Box>
        </MainFlex>
        <Footer/>
      </div>
    );
  }
}

export default App
