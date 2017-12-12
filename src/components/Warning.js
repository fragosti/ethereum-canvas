import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { space } from 'styled-system';

import DismissableIsland from './DismissableIsland';
import { Description, Title } from './Text';

const Warning = ({ className, error }) => (
  <DismissableIsland className={className}>
    <Title> Oops! 😔 </Title>
    <Description> 
      Something has gone wrong!
    </Description>
    <Description mb='1em'> 
      Here is the error if it helps:
    </Description>
    <pre>
      {error}
    </pre>
  </DismissableIsland> 
);


export default styled(Warning)`
  padding: ${modularScale(2)};
  max-width: 700px;
  ${space}
`