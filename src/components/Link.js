import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { colors } from '../style/utils';

const A = styled.a`
  color: ${colors.blue};
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const RouterA = A.withComponent(RouterLink);

// If `to` prop is present we use react-router-dom link
const Link = ({ to, children, className, ...rest }) => to ? 
  <RouterA className={className} to={to}>{children}</RouterA> : 
  <A className={className} {...rest}>{children}</A>;

export default styled(Link)``;
