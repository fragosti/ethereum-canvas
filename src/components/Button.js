import React from 'react';
import styled from 'styled-components';
import { darken, saturate, desaturate } from 'polished';
import * as Icons from 'react-feather';
import { space } from 'styled-system'

import { colors } from '../style/utils';

const StyledButton = styled.button`
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.15);
  font-size: ${props => props.fontSize}px;
  min-width: 4em;
  padding: .8em 2.5em;
  font-weight: 700;
  font-family: 'Lato', sans-serif;
  background: ${colors.orange};
  border: 1px solid ${darken(0.2, colors.orange)};
  border-radius: 3px;
  color: ${colors.white};
  cursor: pointer;
  &:hover {
    background: ${saturate(0.2, colors.orange)}
  }
  &:focus {
    outline: none;
    background: ${saturate(0.4, colors.orange)}
  }
  &:active {
    background: ${desaturate(0.2, colors.orange)};
  }
`;

const IconContainer = styled.span`
  position: relative;
  top: 2px;
  left: 6px;
`

const Button = ({ iconName, fontSize, children, className }) => {
  const Icon = Icons[iconName]
  return (
    <StyledButton fontSize={fontSize} className={className}> 
      {children}
      {Icon && (
        <IconContainer>
          <Icon size={fontSize}/>
        </IconContainer>
      )}
    </StyledButton>
  )  
};

Button.defaultProps = {
  icon: null,
  fontSize: 18,
}

export default styled(Button)`
  ${space}
`;