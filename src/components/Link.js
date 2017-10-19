import styled from 'styled-components';

import { colors } from '../style/utils';

export default styled.a`
  color: ${colors.blue};
  font-weight: 700;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
