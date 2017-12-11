import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import { space } from 'styled-system';

import { colors } from '../style/utils';
import { toEther, etherUsd } from '../utils/price';

const Label = styled.label`
  font-weight: 700;
  ${space}
`

const Price = styled.span`
  font-size: 1.5em;
  display: inline-block;
  color: ${colors.grayText};
  ${space}
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
    const usdPrice = ethUsd ? ethPrice*ethUsd : 'finding...' ;
    return  (
      <Flex justify='center' direction='column' align='center' mb='2em'>
        <Label mb='1em'>Price: </Label>
        <Box>
          <Price mx='1em'>{weiPrice} wei</Price>|
          <Price mx='1em'>{ethPrice} eth</Price>|
          <Price mx='1em'>${usdPrice}</Price>
        </Box>
      </Flex>
    )
  }
}

export default PriceTicker;