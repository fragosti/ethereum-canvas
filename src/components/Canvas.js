import React, { Component } from 'react';
import styled from 'styled-components';
import { Layer, Rect, Stage } from 'react-konva';

import Island from './Island';

class Canvas extends Component {

  render() {
    const { className } = this.props;
    return (
      <Island className={className}>
        <Stage width={1000} height={1000}>
          <Layer>
            <Rect
              x={10}
              y={10}
              width={50}
              height={50}
              fill={'red'}
              shadowBlur={5}/>
          </Layer>
        </Stage> 
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