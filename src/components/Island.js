import styled from 'styled-components';
import { modularScale } from 'polished';
import { space } from 'styled-system';

import { colors } from '../style/utils';

export default styled.div`
  position: relative;
  border-radius: 2px;
  background-color: ${colors.white};
  border: 1px solid ${colors.grayBorder};
  padding: ${modularScale(2)};
  max-width: 700px;
  ${space}
`