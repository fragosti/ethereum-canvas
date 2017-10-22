import React, { Component } from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished'

import Island from './Island';
import Button from './Button';


class Control extends Component {
  state = {
    selectedTool: 'paintbrush',
  }

  render() {
    const { className } = this.props;
    return (
      <Island className={className}>
        <Button mx='1em' iconName='Edit2'>
          Draw
        </Button> 
        <Button mx='1em' iconName='Image'>
          Image
        </Button> 
      </Island>
    )
  }
}

export default styled(Control)`
  padding: ${modularScale(2)};
  max-width: 1080px;
`