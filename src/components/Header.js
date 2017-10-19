import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';

import Logo from './Logo';
import { colors } from '../style/utils';


const Header = ({ className }) => (
  <header className={className}>
    <Logo/>
  </header>
)

export default styled(Header)`
  border-bottom: 1px solid ${colors.grayBorder};
  padding: ${modularScale(2)};
  margin: 0px auto;
  width: 100%;
`;