import React, { Component } from 'react';
import styled from 'styled-components';

import Sketchpad from './SketchPad';
import Island from './Island';

class Canvas extends Component {

  render() {
    const { 
      color, 
      tool, 
      drawThickness,
      className,
    } = this.props;
    return (
      <Island className={className}>
        <Sketchpad
          width={1000}
          height={1000}
          size={drawThickness}
          color={color}
          tool={tool}
          items={[]}
        />
      </Island>
    )
  }
}

export default styled(Canvas)`
  max-width: 1000px;
  max-height: 1000px;
  height: 100%;
  width: 100%;
`;