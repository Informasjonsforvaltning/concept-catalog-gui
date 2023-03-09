import React from 'react';
import { localization } from '../../../lib/localization';

import SC from './styled';

interface Props {
  title: string;
}

export const ConceptTitle = ({ title }: Props): JSX.Element | null => (
  <SC.ConceptTitle>
    <SC.Title>{localization.conceptCatalog}</SC.Title>
    <SC.SubTitle>{title}</SC.SubTitle>
  </SC.ConceptTitle>
);
