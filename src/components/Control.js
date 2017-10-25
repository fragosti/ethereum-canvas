import React, { Component } from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished'
import { Box, Flex } from 'grid-styled';
import { X } from 'react-feather';
import { space } from 'styled-system';

import Island from './Island';
import Button from './Button';
import ColorPicker from './ColorPicker';
import Picker from './Picker';
import { colors } from '../style/utils';
import { TOOL_PENCIL, TOOL_NONE } from '../tools';

const StyledFlex = Flex.extend`
  border-top: 1px solid ${colors.grayBorder};
  position: relative;
`

const Close = styled.span`
  position: absolute;
  top: 10px;
  right: 0px;
  cursor: pointer;
`

const Options = ({ children, onClickClose }) => (
  <StyledFlex 
    justify='center'
    mt='1em' 
    pt={modularScale(2)} 
    px={modularScale(2)}>
    {children}
    <Close onClick={onClickClose}><X/></Close>
  </StyledFlex>
)

class Control extends Component {

  selectTool = (selectedTool) => {
    this.props.onChange('selectedTool', selectedTool)
  }

  selectColor = (color) => {
    this.props.onChange('selectedColor', color)
  }

  selectDrawThickness = (thickness) => {
    this.props.onChange('drawThickness', thickness)
  }

  selectNone = () => this.selectTool(TOOL_NONE)
  selectPencil = () => this.selectTool(TOOL_PENCIL)
  selectImage = () => this.selectTool('image')
  onColorChange = ({ hex }) => this.selectColor(hex)

  optionsForTool = (tool) => {
    const { selectedColor, drawThickness } = this.props;
    const pixelOptions = [1,2,3,4,5,6,7,8,9,10].map(v => ({ value: v, label: `${v}px` }))
    const colorPicker = (
      <ColorPicker
        mx='1em'
        label='Color:'
        color={selectedColor}
        onChange={this.onColorChange}
      />
    )
    switch(tool) {
      case TOOL_PENCIL:
        return (
          <Options onClickClose={this.selectNone}>
            {colorPicker}
            <Picker
              mx='1em'
              label='Thickness:'
              name='drawThickness'
              options={pixelOptions}
              value={drawThickness}
              onChange={(_, value) => this.selectDrawThickness(value)}
            />
          </Options>
        )
      case 'image':
        return (
          <Options onClickClose={this.selectNone}>
            {colorPicker}
            
          </Options>
        )
      default:
        return null
    }
  }

  render() {
    const { className, selectedTool, claimPixels } = this.props;
    return (
      <Island className={className}>
        <Box>
          <Button 
            mx='1em' 
            iconName='Edit2' 
            selected={selectedTool === 'draw'}
            onClick={this.selectPencil}
          >
            Draw
          </Button> 
          <Button 
            mx='1em' 
            iconName='Image' 
            selected={selectedTool === 'image'}
            onClick={this.selectImage}
          >
            Image
          </Button> 
          <Button 
            mx='1em' 
            disabled
            color={colors.blue}
            iconName='Award'
            onClick={claimPixels}
          >
            Claim
          </Button> 
        </Box>
        {selectedTool && this.optionsForTool(selectedTool)}
      </Island>
    )
  }
}


export default styled(Control)`
  padding: ${modularScale(2)};
  max-width: 1080px;
  ${space}
`