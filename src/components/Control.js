import React, { Component } from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished'
import { Box, Flex } from 'grid-styled';

import Island from './Island';
import Button from './Button';
import ColorPicker from './ColorPicker';
import Picker from './Picker';
import { colors } from '../style/utils';

const StyledFlex = Flex.extend`
  border-top: 1px solid ${colors.grayBorder};
`

const Options = ({ children }) => (
  <StyledFlex 
    justify='center'
    mt='1em' 
    pt={modularScale(2)} 
    px={modularScale(2)}>
    {children}
  </StyledFlex>
)

class Control extends Component {
  state = {
    selectedTool: null,
    selectedColor: colors.blue,
    drawThickness: 1,
  }

  selectTool = (selectedTool) => {
    this.setState({ selectedTool })
  }

  selectLine = () => this.selectTool('draw')
  selectImage = () => this.selectTool('image')

  selectColor = ({ hex }) => this.setState({ selectedColor: hex })

  optionsForTool = (tool) => {
    const { selectedColor, drawThickness } = this.state;
    const pixelOptions = [1,2,3,4,5,6,7,8,9,10].map(v => ({ value: v, label: `${v}px` }))
    const colorPicker = (
      <ColorPicker
        mx='1em'
        label='Color:'
        color={selectedColor}
        onChange={this.selectColor}
      />
    )
    switch(tool) {
      case 'draw':
        return (
          <Options>
            {colorPicker}
            <Picker
              mx='1em'
              label='Thickness:'
              name='drawThickness'
              options={pixelOptions}
              value={drawThickness}
              onChange={(_, value) => this.setState({ drawThickness: value })}
            />
          </Options>
        )
      case 'image':
        return (
          <Options>
            {colorPicker}
            
          </Options>
        )
    }
  }

  render() {
    const { 
      className,
      onColorChange,
     } = this.props;
    const { selectedTool, selectedColor } = this.state;
    return (
      <Island className={className}>
        <Box>
          <Button mx='1em' iconName='Edit2' onClick={this.selectLine}>
            Draw
          </Button> 
          <Button mx='1em' iconName='Image' onClick={this.selectImage}>
            Image
          </Button> 
        </Box>
        {selectedTool &&
          this.optionsForTool(selectedTool)
        }
      </Island>
    )
  }
}


export default styled(Control)`
  padding: ${modularScale(2)};
  max-width: 1080px;
`