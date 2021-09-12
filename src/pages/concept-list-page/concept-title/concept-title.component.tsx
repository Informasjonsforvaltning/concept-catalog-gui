import React from 'react';
import { localization } from '../../../lib/localization';

interface Props {
  title: string;
}

export const ConceptTitle = ({ title }: Props): JSX.Element | null => (
  <div>
    <h1>{localization.conceptCatalog}</h1>
    <p>{title}</p>
  </div>
);
