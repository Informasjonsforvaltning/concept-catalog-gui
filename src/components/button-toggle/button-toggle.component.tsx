import React, { FC } from 'react';
import { Variant } from '@fellesdatakatalog/button';
import { localization } from '../../lib/localization';

import SC from './styled';

interface Props {
  expanded: boolean;
  toggle: any;
}

export const ButtonToggle: FC<Props> = ({ expanded, toggle }) => (
  <SC.ButtonToggle variant={Variant.TERTIARY} onClick={toggle}>
    {expanded ? <SC.CollapseIcon /> : <SC.ExpandIcon />}
    {expanded ? localization.collapse : localization.expand}
  </SC.ButtonToggle>
);
