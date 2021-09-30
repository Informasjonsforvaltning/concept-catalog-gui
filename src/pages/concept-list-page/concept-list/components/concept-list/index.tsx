import React, { FC, useState } from 'react';

import { Concept } from '../../../../../types';
import { SortDirection } from '../../../../../types/enums';
import { sortConceptsByKey } from '../../../../../utils/sort';

import ListItem from '../concept-list-item';
import ConceptListHeader from '../concept-list-header';

interface Props {
  items: Concept[];
}

export const ConceptList: FC<Props> = ({ items }) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  const onSortField = (
    field: string,
    updatedSortDirection: SortDirection
  ): void => {
    setSortField(field);
    setSortDirection(updatedSortDirection);
  };

  return (
    <div className='d-flex flex-column flex-fill'>
      <ConceptListHeader
        sortField={sortField}
        sortDirection={sortDirection}
        onSortField={onSortField}
      />
      {items &&
        items
          .sort(sortConceptsByKey(sortField, sortDirection))
          .map((concept, index) => (
            <ListItem key={`${concept?.id}-${index}`} concept={concept} />
          ))}
    </div>
  );
};
