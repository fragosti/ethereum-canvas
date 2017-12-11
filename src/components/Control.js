import React, { Component } from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { Box, Flex } from 'grid-styled';
import { space } from 'styled-system';

import Island from './Island';
import Button from './Button';
import Close from './Close';
import ColorPicker from './ColorPicker';
import PriceTicker from './PriceTicker';
import Picker from './Picker';
import { colors } from '../style/utils';
import getAccounts from '../utils/getAccounts';
import { range } from '../utils/array';
import { 
  TOOL_LINE, 
  TOOL_RECTANGLE, 
  TOOL_ELLIPSE, 
  TOOL_NONE, 
  TOOL_ERASER 
} from '../tools';

const StyledFlex = Flex.extend`
  border-top: 1px solid ${colors.grayBorder};
  position: relative;
`

const Options = ({ children, onClickClose }) => (
  <StyledFlex 
    justify='center'
    mt='1em' 
    align='flex-end'
    pt={modularScale(2)} 
    px={modularScale(2)}
  >
    {children}
    <Close onClick={onClickClose}/>
  </StyledFlex>
)

export const LINE_OPTIONS = 'lineOptions';
export const SHAPE_OPTIONS = 'shapeOptions';
export const ERASE_OPTIONS = 'eraseOptions';
export const CLAIM_OPTIONS = 'claimOptions';

const toolsToOptions = {
  [TOOL_NONE]: null,
  [TOOL_ERASER]: null,
  [TOOL_LINE]: LINE_OPTIONS,
  [TOOL_RECTANGLE]: SHAPE_OPTIONS,
  [TOOL_ELLIPSE]: SHAPE_OPTIONS
}

class Control extends Component {

  state = {
    accounts: null,
  }

  componentDidMount() {
    getAccounts().then(accounts => this.setState({ accounts: accounts || [] }))
  }

  selectOptions = (options) => {
    this.props.onChange('selectedOptions', options);
  }

  selectTool = (selectedTool) => {
    this.props.onChange('selectedTool', selectedTool)
    this.selectOptions(toolsToOptions[selectedTool])
  }

  selectColor = (color) => {
    this.props.onChange('selectedColor', color)
  }

  selectFill = (color) => {
    this.props.onChange('selectedFill', color)
  }

  selectAccount = (account) => {
    this.props.onChange('selectedAccount', account)
  }

  selectDrawThickness = (thickness) => {
    this.props.onChange('drawThickness', thickness)
  }

  selectNone = () => this.selectTool(TOOL_NONE)
  selectLine = () => this.selectTool(TOOL_LINE)
  selectRectangle = () => this.selectTool(TOOL_RECTANGLE)
  selectEllipse = () => this.selectTool(TOOL_ELLIPSE)
  selectEraser = () => this.selectTool(TOOL_ERASER)
  onColorChange = ({ hex }) => this.selectColor(hex)
  onFillChange = ({ hex }) => this.selectFill(hex)

  optionsToShow = () => {
    const { 
      selectedColor, 
      selectedFill,
      selectedOptions, 
      selectedAccount, 
      drawThickness, 
      claimPixels,
    } = this.props;
    const { accounts } = this.state;
    if (!selectedOptions) return null;
    const pixelOptions = range(30).map(v => ({ value: v, label: `${v}px` }))
    const accountOptions = accounts.map(v => ({ value: v, label: v }))
    const colorPicker = (
      <ColorPicker
        mx='1em'
        label='Color:'
        color={selectedColor}
        onChange={this.onColorChange}
      />
    )
    const thicknessPicker = (
      <Picker
        mx='1em'
        label='Thickness:'
        name='drawThickness'
        options={pixelOptions}
        value={drawThickness}
        onChange={(_, value) => this.selectDrawThickness(value)}
      />
    )
    switch(selectedOptions) {
      case LINE_OPTIONS:
        return (
          <Options onClickClose={this.selectNone}>
            {colorPicker}
            {thicknessPicker}
          </Options>
        )
      case SHAPE_OPTIONS:
        return (
          <Options onClickClose={this.selectNone}>
            {colorPicker}
            <ColorPicker
              mx='1em'
              label='Fill:'
              color={selectedFill}
              onChange={this.onFillChange}
            />
            {thicknessPicker}
          </Options>
        )
      case CLAIM_OPTIONS:
        return (
          <Options onClickClose={this.selectNone}>
            <Picker
              mx='1em'
              label='Account:'
              name='account'
              options={accountOptions}
              value={selectedAccount}
              onChange={(_, value) => this.selectAccount(value)}
            />
            <Button
              mx='1em'
              color={colors.blue}
              onClick={claimPixels}
            >Claim Pixels</Button>
          </Options>
        )
      default:
        return null
    }
  }

  render() {
    const { className, selectedTool, price, } = this.props;
    return (
      <Island className={className}>
        <PriceTicker weiPrice={price} />
        <Box>
          <Button 
            mx='1em' 
            iconName='Edit2' 
            selected={selectedTool === TOOL_LINE}
            onClick={this.selectLine}
          >
            Line
          </Button> 
          <Button 
            mx='1em' 
            iconName='Square' 
            selected={selectedTool === TOOL_RECTANGLE}
            onClick={this.selectRectangle}
          >
            Rectangle
          </Button>
          <Button 
            mx='1em' 
            iconName='Circle' 
            selected={selectedTool === TOOL_ELLIPSE}
            onClick={this.selectEllipse}
          >
            Ellipse
          </Button>
          <Button 
            mx='1em' 
            iconName='Trash' 
            selected={selectedTool === ERASE_OPTIONS }
            onClick={this.selectEraser}
          >
            Erase
          </Button> 
          <Button 
            mx='1em' 
            selected={selectedTool === CLAIM_OPTIONS }
            iconName='Award'
            color={colors.blue}
            onClick={() => this.selectOptions(CLAIM_OPTIONS)}
          >
            Claim
          </Button> 
        </Box>
        {this.optionsToShow()}
      </Island>
    )
  }
}


export default styled(Control)`
  padding: ${modularScale(2)};
  max-width: 1080px;
  ${space}
`