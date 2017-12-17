import React, { Component } from 'react';
import { Box, Flex } from 'grid-styled';

import { Title, Description } from './Text';
import { toEther, etherUsd } from '../utils/price';
import { round } from '../utils/math';

const Price = Description.extend`
  min-width: 250px;
  text-align: center;
`;

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
    const usdPrice = ethUsd ? `$${round(ethPrice*ethUsd, 2)}` : 'finding...' ;
    return  (
      <Flex justify='center' direction='column' align='center' mb='2em'>
        <Title>Price: </Title>
        <Box>
          <Price mx='1em'>{weiPrice} wei</Price>
          <Price mx='1em'>{ethPrice} ether</Price>
          <Price mx='1em'>{usdPrice}</Price>
        </Box>
      </Flex>
    )
  }
}

export default PriceTicker;