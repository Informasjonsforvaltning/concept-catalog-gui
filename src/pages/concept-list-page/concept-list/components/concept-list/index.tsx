import React, { FC, useState } from 'react';
import _ from 'lodash';

import { Concept } from '../../../../../types';
import { SortDirection } from '../../../../../types/enums';
import { getTranslateText } from '../../../../../lib/translateText';

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

  const iteratees = i => {
    const f: any = getTranslateText(_.get(i, sortField));
    return f instanceof Array ? f[0]?.toLowerCase() : f?.toLowerCase();
  };

  return (
    <div className='d-flex flex-column flex-fill'>
      <ConceptListHeader
        sortField={sortField}
        sortDirection={sortDirection}
        onSortField={onSortField}
      />
      {items &&
        _.orderBy(items, [iteratees], [sortDirection]).map((concept, index) => (
          <ListItem key={`${concept?.id}-${index}`} concept={concept} />
        ))}
    </div>
  );
};
