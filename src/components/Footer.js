import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import { Flex, Box } from 'grid-styled';

import { colors } from '../style/utils';
import Logo from './Logo';
import Link from './Link';

const CenteredContent = Box.extend`
  text-align: center;
`

const Footer = ({ className }) => (
  <Flex width={2/3} wrap is='footer' className={className}>
    <CenteredContent width={1/3}>
      <Logo scale={1/2}/>
    </CenteredContent>
    <Box width={1/2} my='auto'> 
      <Flex justify='space-evenly' wrap>
        <Link>About</Link>
        <Link>FAQ</Link>
        <Link>HowTo</Link>
        <Link>Contract</Link>
        <Link>Source Code</Link>
      </Flex>
    </Box>
  </Flex>
)

export default styled(Footer)`
  border-top: 1px solid ${colors.grayBorder};
  padding: ${modularScale(2)};
  margin: 0px auto;
`