import React, { useEffect } from 'react';

import { getTranslateText } from '../../lib/translateText';

import Root from '../../components/root';
import { CatalogItem } from './catalog-item';

import SC from './styled';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import {
  fetchCollections,
  selectAllCollections
} from '../../features/collections';
import {
  fetchPublishers,
  selectAllPublisherEntities
} from '../../features/publishers';
import { localization } from '../../lib/localization';

export const OverviewPagePure = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const collections = useAppSelector(selectAllCollections);
  const publishers = useAppSelector(selectAllPublisherEntities);

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchPublishers());
  }, []);

  const catalogTitle = (id: string): string => {
    const name = publishers[id]?.prefLabel
      ? getTranslateText(publishers[id]?.prefLabel)
      : publishers[id]?.name;
    return name || localization.missingTitle;
  };

  return (
    <Root>
      <SC.Container>
        <div>
          {collections.map(collection => (
            <div key={collection.id} className='row mb-2 mb-md-5'>
              <div className='col-12'>
                <div className='mb-3'>
                  <SC.CatalogTitle>
                    {collection?.id
                      ? catalogTitle(collection.id)
                      : localization.missingTitle}
                  </SC.CatalogTitle>
                  <CatalogItem
                    itemsCount={collection?.antallBegrep}
                    catalogId={collection.id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SC.Container>
    </Root>
  );
};
