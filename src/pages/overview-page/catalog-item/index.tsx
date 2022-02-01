import React, { FC } from 'react';

import { localization } from '../../../lib/localization';

import { ConceptIcon, Title } from './styled';

import './catalog-item.component.scss';

interface ExternalProps {
  itemsCount?: number;
  linkUri: string;
}

interface Props extends ExternalProps {}

export const CatalogItem: FC<Props> = ({ itemsCount, linkUri }) => (
  <a className='catalog-item mb-2' href={linkUri}>
    <div className='catalog-item__body d-flex flex-column align-items-center'>
      <ConceptIcon />
      <Title>{localization.conceptCatalog}</Title>
      <span className='fdk-text-size-small fdk-color-neutral-dark'>
        {itemsCount || localization.none} {localization.concepts}
      </span>
    </div>
  </a>
);
