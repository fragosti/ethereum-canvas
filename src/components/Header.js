import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';

import Logo from './Logo';
import { colors } from '../style/utils';


const Container = styled.nav`
  padding: ${modularScale(2)}
  margin: 0px auto;
`

const Header = ({className}) => (
  <Container className={className}>
    <Logo/>
  </Container>
)

export default styled(Header)`
  border-bottom: 2px solid ${colors.gray[3]};
`;