import React, { Component } from 'react';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import styled from 'styled-components';
import { space } from 'styled-system';

import { zIndex } from '../style/utils';
import Button from './Button';
import { Label } from './Select';
import withOnClickOutside from '../HOCs/withOnClickOutside';

const AwareButton = withOnClickOutside(Button)

const PickerWrapper = styled.div`
  position: absolute;
  z-index: ${zIndex.aboveLabel};
`

class ColorPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  render() {
    const { color, label, children, onChange, className } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={className}>
        {label && <Label>{label}</Label>}
        <AwareButton 
          showing={isOpen}
          color={color}
          fontSize={20}
          onClick={()=> this.setState({ isOpen: true })}
          onClickOutside={()=> this.setState({ isOpen: false })}
        >
        {children}
        </AwareButton>
        {isOpen && (
          <PickerWrapper>
            <ChromePicker color={color} onChangeComplete={onChange}/>
          </PickerWrapper>
        )}
      </div>
    )
  }
}

export default styled(ColorPicker)`
  ${space}
`;
