import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { space } from 'styled-system';

import DismissableIsland from './DismissableIsland';
import { Description, Title } from './Text';

const Warning = ({ className, error }) => (
  <DismissableIsland className={className}>
    <Title> Oops! 😔 </Title>
    <Description mb='1em'>Something has gone wrong! </Description>
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