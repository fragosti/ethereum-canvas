import React from 'react';

import Container from './Container';
import Island from './Island';
import Link from './Link';
import { Heading, Description, Title } from './Text';

const FAQ = () => (
  <Container>
    <Island my='1em'>
      <Heading mb={20}>FAQ‍</Heading>
      <Title>What is the point of this?</Title>
      <Description mb={30}>
        We were interested in trying out Solidity programming and were inspired by projects
        like <Link target='_blank' href='https://thousandetherhomepage.com/'>this</Link> to create something visual.
      </Description>
      <Title>What do I get?</Title>
      <Description mb={30}>While this is mostly an experiment, the selling point is that your drawing is saved
        on the Ethereum blockchain forever. This site is hosted basically for free using <Link target='_blank' href='https://aws.amazon.com/s3/'>S3</Link> and <Link target='_blank' href='https://aws.amazon.com/cloudfront/'>Cloudfront</Link> so it will be around for a long time.  
      </Description>
      <Title>How do I save my drawing?</Title>
      <Description mb={30}> See the <Link to='howto'>HowTo</Link> section, but long story short you'll need the <Link target='_blank' href='https://metamask.io/'>Metamask</Link> chrome extension 
        or an Ethereum enabled browser like <Link target='_blank' href='https://github.com/ethereum/mist/releases'>Mist</Link> or <Link target='_blank' href='https://raw.githubusercontent.com/paritytech/scripts/master/get-parity.shs'>Parity</Link>.
      </Description>
      <Title>How does this work?</Title>
      <Description mb={30}>This website is hosted statically on <Link target='_blank' href='https://aws.amazon.com/s3/'>S3</Link> and the backend is entirely supported by the Ethereum blockchain! Communication between the two
      is facilitated by <Link target='_blank' href='https://github.com/ethereum/web3.js/'>Web3.js</Link>.
      </Description>
      <Title>Is this an ICO?</Title>
      <Description mb={30}>Nope! Just a DApp.</Description>
      <Title>Why can't I erase some of the shapes?</Title>
      <Description mb={30}> 
        You're only allowed to erase what you've drawn. Once something is on the blockchain, it remains there permanently. 
      </Description>
    </Island>
  </Container>
)

export default FAQ;