import React, { FC, HTMLAttributes } from 'react';

import SC from './styled';

interface Props extends HTMLAttributes<HTMLInputElement> {
  checked: boolean;
  disabled: boolean;
}

export const Checkbox: FC<Props> = ({ checked, ...props }) => (
  <SC.CheckboxContainer>
    <SC.HiddenCheckbox checked={checked} {...props} />
    <SC.StyledCheckbox $checked={checked}>
      <SC.Icon viewBox='0 0 24 24'>
        <polyline points='20 6 9 17 4 12' />
      </SC.Icon>
    </SC.StyledCheckbox>
  </SC.CheckboxContainer>
);
