import styled from 'styled-components';
import { modularScale } from 'polished';

import { colors } from '../style/utils';

export const Description = styled.p`
  color: ${colors.grayText};
  font-size: ${props => props.size !== undefined ? modularScale(props.size) : '24px'};
`

export const Title = styled.p`
  color: ${colors.black};
  font-weight: 700;
  font-size: ${props => props.size !== undefined ? modularScale(props.size ) : '30px'};
`

export const Heading = styled.h1`
  color: ${colors.black};
  font-size: ${props => props.size !== undefined ? modularScale(props.size) : '44px'};
  display: inline-block;
`