import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { localization } from '../../../lib/localization';

import SC from './styled';

interface ExternalProps {
  itemsCount?: number;
  catalogId: string;
}

interface Props extends ExternalProps {}

export const CatalogItem: FC<Props> = ({ itemsCount, catalogId }) => (
  <SC.CatalogLink to={catalogId} as={RouterLink}>
    <SC.CatalogItemBody>
      <SC.ConceptIcon />
      <SC.Title>{localization.conceptCatalog}</SC.Title>
      <SC.CatalogItemCount>
        {itemsCount || localization.none} {localization.concepts}
      </SC.CatalogItemCount>
    </SC.CatalogItemBody>
  </SC.CatalogLink>
);
