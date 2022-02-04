import React from 'react';
import { Variant } from '@fellesdatakatalog/button';

import SC from './styled';

interface Props {
  add?: boolean;
  remove?: boolean;
  title: string;
  handleClick: any;
}

export const ButtonSource = ({
  title,
  handleClick,
  remove = false,
  add = false
}: Props): JSX.Element => (
  <SC.ButtonSource
    variant={Variant.TERTIARY}
    aria-haspopup='true'
    aria-expanded='false'
    onClick={handleClick}
  >
    {remove && <SC.IconRemove />}
    {add && <SC.IconAdd />}

    <span>{title}</span>
  </SC.ButtonSource>
);
