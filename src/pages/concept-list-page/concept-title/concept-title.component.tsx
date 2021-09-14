import React from 'react';
import { localization } from '../../../lib/localization';

import SC from './styled';

interface Props {
  title: string;
}

export const ConceptTitle = ({ title }: Props): JSX.Element | null => (
  <div>
    <SC.Title>{localization.conceptCatalog}</SC.Title>
    <div>{title}</div>
  </div>
);
