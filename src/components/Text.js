import styled from 'styled-components';
import { modularScale } from 'polished';

import { colors } from '../style/utils';

export const Title = styled.h1`
  color: ${colors.gray[9]};
  font-size: ${props => props.size ? modularScale(props.size) : '44px'};
  display: inline-block;
`