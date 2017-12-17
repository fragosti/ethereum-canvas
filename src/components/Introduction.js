import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

import DismissableIsland from './DismissableIsland';
import Link from './Link';
import { Description, Title } from './Text';

const Introduction = ({ className }) => (
  <DismissableIsland className={className}>
    <Title> 🎉 Welcome! 🎉 </Title>
    <Description> 
      Ethereum Canvas is a smart contract that allows you to draw on the blockchain.
    </Description>
    <Description> 
      Start drawing using the tools below and press `Claim` when you are ready to save the drawing onto the blockchain.
    </Description>
    <Description>
      The price per pixel is 0.0000001 ether.
    </Description>
    <Description>
      Anything you draw will remain on the blockchain forever. 💫
    </Description>
    <Description>
      More questions? Check out the <Link to='faq'>FAQ</Link>.
    </Description>
  </DismissableIsland> 
)

export default styled(Introduction)`
  ${space}
`
