import React, { Component } from 'react';
import { Box, Flex } from 'grid-styled';

import { Title, Description } from './Text';
import { toEther, etherUsd } from '../utils/price';


class PriceTicker extends Component {
  state = {
    ethUsd: null,
  };

  constructor(props) {
    super(props);
    etherUsd.then(ethUsd => this.setState({ ethUsd }));
  }

  render() {
    const { weiPrice } = this.props;
    const { ethUsd } = this.state;
    const ethPrice = toEther(weiPrice);
    const usdPrice = ethUsd ? ethPrice*ethUsd : 'finding...' ;
    return  (
      <Flex justify='center' direction='column' align='center' mb='2em'>
        <Title>Price: </Title>
        <Box>
          <Description mx='1em'>{weiPrice} wei</Description>|
          <Description mx='1em'>{ethPrice} ether</Description>|
          <Description mx='1em'>${usdPrice}</Description>
        </Box>
      </Flex>
    )
  }
}

export default PriceTicker;