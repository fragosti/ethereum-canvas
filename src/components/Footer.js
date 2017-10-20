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

const FooterFlex = Flex.extend`
  max-width: 1080px;
`

const FooterLink = Link.extend`
  margin-bottom: 5px;
  margin-left: 1em;
`

const Footer = ({ className }) => (
  <footer className={className}>
    <FooterFlex wrap width='100%' mx='auto'>
      <CenteredContent width={[1/2, 1/3]}>
        <Logo scales={[1/4, 1/3, 1/2]}/>
      </CenteredContent>
      <Box width={[1/3,1/2]} my='auto'> 
        <Flex justify='space-evenly' wrap>
          <FooterLink>About</FooterLink>
          <FooterLink>FAQ</FooterLink>
          <FooterLink>HowTo</FooterLink>
          <FooterLink>Contract</FooterLink>
          <FooterLink>Source</FooterLink>
        </Flex>
      </Box>
    </FooterFlex>
  </footer>
);

export default styled(Footer)`
  border-top: 1px solid ${colors.grayBorder};
  padding: ${modularScale(2)};
  margin: 0px auto;
`