import React from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';

const Positioning = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`

const Close = (props) => (
  <Positioning {...props}>
    <X/>
  </Positioning>
)

export default Close;