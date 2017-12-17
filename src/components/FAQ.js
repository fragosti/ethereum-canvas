import React from 'react';

import Container from './Container';
import Island from './Island';
import Link from './Link';
import { Heading, Description, Title } from './Text';

const FAQ = () => (
  <Container>
    <Island my='1em'>
      <Heading mb={20}>FAQ‍</Heading>
      <Title>How does this work?</Title>
      <Description mb={30}>
        You'll need the <Link target='_blank' href='https://metamask.io/'>Metamask</Link> chrome extension 
        or an Ethereum enabled browser like <Link target='_blank' href='https://github.com/ethereum/mist/releases'>Mist</Link> or <Link target='_blank' href='https://raw.githubusercontent.com/paritytech/scripts/master/get-parity.shs'>Parity</Link> to get started.
        Then, select a tool along with color and fill options to draw on the canvas. Once you're ready press <i>Claim</i> and select the account to use. Then press <i> Claim Pixels</i>.
        Here is a <Link href='' target='_blank'>GIF</Link>
      </Description>
      <Title>What is the point of this?</Title>
      <Description mb={30}>
        We were interested in trying out Solidity programming and were inspired by projects
        like <Link target='_blank' href='https://thousandetherhomepage.com/'>this</Link> to create something visual.
      </Description>
      <Title>What do I get?</Title>
      <Description mb={30}>While this is mostly an experiment, the selling point is that your drawing is saved
        on the Ethereum blockchain forever. This site is hosted basically for free using <Link target='_blank' href='https://aws.amazon.com/s3/'>S3</Link> and <Link target='_blank' href='https://aws.amazon.com/cloudfront/'>Cloudfront</Link> so it will be around for a long time.  
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
      <Title>Why isn't there a pencil or pen tool?</Title>
      <Description mb={30}> 
        A tool like that would require too much <Link href='https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas' target='_blank'>gas</Link> per transaction to be plausible. 
        Shapes are stored in minimal represenations on the blockchain by start and end points, color etc...
      </Description>
    </Island>
  </Container>
)

export default FAQ;