import React, { Component } from 'react';
import { modularScale } from 'polished';
import { Flex, Box } from 'grid-styled';

import { 
  TOOL_NONE,
} from '../tools';
import getContract from '../utils/getContract';
import { colors } from '../style/utils';
import { pixelWeiPrice, gasPerShape } from '../constants/price';
import { range } from '../utils/array';
import { itemsToShapes, rawShapeToItem, totalPixels } from '../utils/shapes';
import Canvas from './Canvas';
import Introduction from './Introduction';
import Control from './Control';


const MainFlex = Flex.extend`
  background-color: ${colors.grayBackground};
`;

class Main extends Component {

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
    this.drawPermanentShapes()
  }

  drawPermanentShapes = () => {
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
    const price = this.price();
    return getContract().then((contract) => {
      return contract.drawShapes(shapeIds, colors, fills, sizes, startXs, startYs, endXs, endYs, {
        value: price,
        gas: this.estimatedGas(),
        from: selectedAccount
      });
    }).then(() => {
      this.setStagedItems([]);
      // TODO: Show transaction on etherscan. 
    }).catch((error) => {
      // TODO: Handle error;
      this.setStagedItems([]);
      console.log(error);
    });
  }

  setStagedItems = (stagedItems) => this.setState({ stagedItems }) 

  addPermanentItem = (item) => {
    const newItems = this.state.permanentItems.concat(item);
    this.setState({ permanentItems: newItems });
  }

  addStagedItem = (item) => {
    const newItems = this.state.stagedItems.concat(item);
    this.setState({ stagedItems: newItems }, this.updateEstimatedGas);
  }

  changeSetting = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  price = () => totalPixels(this.state.stagedItems)*pixelWeiPrice;
  estimatedGas = () => this.state.stagedItems.length * gasPerShape;

  render() {
    const { 
      selectedColor, 
      selectedFill, 
      selectedOptions, 
      drawThickness, 
      selectedTool, 
      selectedAccount, 
      permanentItems,
      stagedItems,
    } = this.state;
    console.log(permanentItems)
    return (
      <MainFlex align='center' justify='center' is='main' direction='column'>
        <Box is='section'>
          <Introduction mt={modularScale(1)}/>
        </Box>
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
            price={this.price()}
          />
        </Box>
        <Box is='section' m={modularScale(1)}>
          <Canvas
            tool={selectedTool}
            color={selectedColor}
            fillColor={selectedFill}
            drawThickness={drawThickness}
            stagedItems={stagedItems}
            setStagedItems={this.setStagedItems}
            allItems={permanentItems.concat(stagedItems)}
            addItem={this.addStagedItem}
          />
        </Box>
      </MainFlex>
    );
  }
}

export default Main