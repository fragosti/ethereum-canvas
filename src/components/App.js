import React, { Component } from 'react';
import { modularScale } from 'polished';
import getContract from '../utils/getContract';
import { Flex, Box } from 'grid-styled';

import { 
  rawToLineItem,
  TOOL_NONE,
  TOOL_LINE, 
  TOOL_RECTANGLE, 
  TOOL_ELLIPSE, 
} from '../tools';
import { colors } from '../style/utils';
import { range } from '../utils/array';
import Header from './Header';
import Canvas from './Canvas';
import Footer from './Footer';
import Control from './Control';


const MainFlex = Flex.extend`
  background-color: ${colors.grayBackground};
`;

const toolToId = {
  [TOOL_LINE]: 0,
  [TOOL_RECTANGLE]: 1,
  [TOOL_ELLIPSE]: 2,
};

class App extends Component {

  state = {
    selectedTool: TOOL_NONE,
    selectedColor: colors.blue,
    selectedAccount: null,
    selectedOptions: null,
    permanentItems: [],
    stagedItems: [],
    drawThickness: 1,
  }

  componentWillMount() {
    getContract().then((contract) => {
      window.contract = contract;
      contract.getNumberOfLines.call().then((length) => {
        range(Number(length)).forEach((i) => {
          contract.lines.call(i).then((rawLine) => this.addPermanentItem(rawToLineItem(rawLine)))
        })
      })
    })
  }

  claimPixels = () => {
    const { selectedAccount, stagedItems } = this.state;
    const numOfItems = stagedItems.length;
    const {
      shapeIds,
      colors,
      fills,
      sizes,
      startXs,
      startYs,
      endXs,
      endYs,
    } = stagedItems.reduce((acc, val, i) => {
      acc.shapeIds[i] = toolToId[val.tool];
      acc.colors[i] = val.color;
      acc.fills[i] = val.fill;
      acc.sizes[i] = val.size;
      acc.startXs[i] = val.start.x;
      acc.startYs[i] = val.start.y;
      acc.endXs[i] = val.end.x;
      acc.endYs[i] = val.end.y;
      return acc;
    }, {
      shapeIds: Array(numOfItems),
      colors: Array(numOfItems),
      fills: Array(numOfItems),
      sizes: Array(numOfItems),
      startXs: Array(numOfItems),
      startYs: Array(numOfItems),
      endXs: Array(numOfItems),
      endYs: Array(numOfItems),
    });

    return getContract().then((contract) => {
      contract.drawShapes(shapeIds, colors, fills, sizes, startXs, startYs, endXs, endYs, {
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
    const { selectedColor, selectedOptions, drawThickness, selectedTool, selectedAccount, permanentItems } = this.state;
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
