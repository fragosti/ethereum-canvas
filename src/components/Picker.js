import React from 'react';
import styled from 'styled-components';
import { space } from 'styled-system';

import Select, { Label } from './Select';

const Picker = ({ label, name, options, value, onChange, className }) => (
  <div className={className}>
    <Label>{label}</Label>
    <Select
      name={name}
      clearable={false}
      value={value}
      options={options}
      onChange={({ value }) => onChange(name, value)}
    />
  </div>
);

export default styled(Picker)`
  ${space}
`;