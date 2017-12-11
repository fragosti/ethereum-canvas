import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { space } from 'styled-system';

import DismissableIsland from './DismissableIsland';
import { Description, Title } from './Text';

const Introduction = ({ className }) => (
  <DismissableIsland className={className}>
    <Title>Welcome!</Title>
    <Description> 

      lalalalaalal
      lalalalaalallalalalaalal

      lalalalaalallalalalaalal
      lalalalaalal
      lalalalaalallalalalaalal
      lalalalaalallalalalaalal
      lalalalaalallalalalaalallalalalaalal
    </Description>
  </DismissableIsland> 
)

export default styled(Introduction)`
  padding: ${modularScale(2)};
  max-width: 700px;
  ${space}
`
