import React, { Component } from 'react';
import styled from 'styled-components';
import { Layer, Rect, Stage } from 'react-konva';

import { colors } from '../style/utils';

class Canvas extends Component {

  render() {
    const { className } = this.props;
    return (
      <Stage className={className} width={1000} height={1000}>
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
    )
  }
}

export default styled(Canvas)`
  border: 1px solid ${colors.grayBorder};
  width: 1000px;
  height: 1000px;
  border-radius: 2px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  background-color: ${colors.white};
`;