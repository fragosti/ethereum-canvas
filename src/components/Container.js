import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { space } from 'styled-system';

import { colors } from '../style/utils';

const Container = (props) => <Flex {...props} align='center' justify='center' is='main' direction='column'/>

export default styled(Container)`
  background-color: ${colors.grayBackground};
  ${space}
`;