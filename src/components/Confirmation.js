import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { space } from 'styled-system';

import DismissableIsland from './DismissableIsland';
import { Description, Title } from './Text';
import Link from './Link';

const Confirmation = ({ className, txn }) => (
  <DismissableIsland className={className}>
    <Title> Transaction Confirmed </Title>
    <Description> 
      Your transaction is in progress. 
    </Description>
    <Description> 
      It will take a few minutes for it to go through and for you to see your drawing permanently below.
    </Description>
    <Description> 
      Check the status at <Link href={`https://etherscan.io/tx/${txn}`} target='_blank'>Etherscan</Link>
    </Description>
  </DismissableIsland> 
);

export default styled(Confirmation)`
  padding: ${modularScale(2)};
  max-width: 700px;
  ${space}
`