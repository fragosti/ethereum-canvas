import React from 'react';
import styled from 'styled-components';
import { darken, saturate, desaturate } from 'polished';
import * as Icons from 'react-feather';
import { space } from 'styled-system';

import { colors } from '../style/utils';


const IconContainer = styled.span`
  position: relative;
  top: 3px;
  left: 8px;
`

const Button = ({ iconName, fontSize, children, onClick, className }) => {
  const Icon = Icons[iconName]
  return (
    <button onClick={onClick} className={className}> 
      {children}
      {Icon && (
        <IconContainer>
          <Icon size={fontSize}/>
        </IconContainer>
      )}
    </button>
  )  
};


const StyledButton = styled(Button)`
  ${space}
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.15);
  font-size: ${props => props.fontSize}px;
  min-width: 4em;
  padding: .8em 2.5em;
  font-weight: 700;
  font-family: 'Lato', sans-serif;
  background: ${props => props.selected ? saturate(0.4, props.color) : props.color};
  border: 1px solid ${props => darken(0.2, props.color)};
  border-radius: 3px;
  color: ${colors.white};
  cursor: pointer;
  &:hover {
    background: ${props => saturate(0.2, props.color)}
  }
  &:focus {
    outline: none;
    background: ${props => saturate(0.4, props.color)}
  }
  &:active {
    background: ${props => desaturate(0.2, props.color)};
  }
`;

StyledButton.defaultProps = {
  icon: null,
  fontSize: 18,
  color: colors.orange,
}

export default StyledButton;