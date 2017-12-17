import React, { Component } from 'react';
import styled from 'styled-components';

import Sketchpad from './SketchPad';
import Island from './Island';

class Canvas extends Component {

  render() {
    const { 
      color, 
      tool, 
      fillColor,
      drawThickness,
      stagedItems,
      setStagedItems,
      allItems,
      addItem,
      className,
    } = this.props;
    return (
      <Island className={className}>
        <Sketchpad
          width={1000}
          height={1000}
          size={drawThickness}
          color={color}
          fillColor={fillColor}
          tool={tool}
          stagedItems={stagedItems}
          setStagedItems={setStagedItems}
          allItems={allItems}
          onCompleteItem={addItem}
        />
      </Island>
    )
  }
}

export default styled(Canvas)`
  max-width: 1000px;
  max-height: 1000px;
  padding: 0;
  height: 100%;
  width: 100%;
`;