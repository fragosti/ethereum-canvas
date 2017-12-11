import styled from 'styled-components';
import { modularScale } from 'polished';
import { space } from 'styled-system';

import { colors } from '../style/utils';

export const Description = styled.p`
  color: ${colors.grayText};
  display: inline-block;
  margin: 5px 0px;
  font-size: ${props => props.size !== undefined ? modularScale(props.size) : '24px'};
  ${space}
`

export const Title = styled.p`
  color: ${colors.black};
  font-weight: 700;
  display: inline-block;
  margin-bottom: 10px;
  font-size: ${props => props.size !== undefined ? modularScale(props.size ) : '30px'};
  ${space}
`

export const Heading = styled.h1`
  color: ${colors.black};
  font-size: ${props => props.size !== undefined ? modularScale(props.size) : '44px'};
  display: inline-block;
  ${space}
`