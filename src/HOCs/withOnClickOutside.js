import React from 'react';
import styled from 'styled-components';

const Blanket = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.zIndex};
`

export default (Component, zIndex = 0) => (
  class ClickOutsideable extends React.Component {
    render() {
      const newProps = Object.assign({}, this.props, { 
        onClickOutside: undefined, 
       })
      return (
        <div>
          { this.props.showing && <Blanket zIndex={zIndex} onClick={this.props.onClickOutside}/>}
          <Component 
            {...newProps}
          />
        </div>
      )
    }
  }
);