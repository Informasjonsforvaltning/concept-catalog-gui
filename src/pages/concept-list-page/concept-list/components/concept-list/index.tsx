import React, { FC, useState } from 'react';
import _ from 'lodash';

import { getTranslateText } from '../../../../../lib/translateText';

import { ListItem } from '../concept-list-item';
import { determineValidity } from '../../utils/determine-validity';
import './concept-list.scss';
import ConceptListHeader from '../concept-list-header';

interface Props {
  items: any;
  catalogId: string;
}

const renderListItems = (
  items,
  catalogId,
  sortField,
  sortDirection
): JSX.Element[] | null => {
  if (!items) {
    return null;
  }

  const iteratees = i => {
    const f: any = getTranslateText(_.get(i, sortField));
    return f instanceof Array ? f[0]?.toLowerCase() : f?.toLowerCase();
  };

  return _.orderBy(items, [iteratees], [sortDirection]).map(
    ({ id, fagområde, status, anbefaltTerm, gyldigFom, gyldigTom }, index) => (
      <ListItem
        key={`${id}-${index}`}
        col1={getTranslateText(anbefaltTerm.navn)}
        col2={getTranslateText(fagområde)}
        col3={determineValidity(gyldigFom, gyldigTom)}
        status={status}
        path={`${catalogId}/${id}`}
      />
    )
  );
};

export const ConceptList: FC<Props> = ({ items, catalogId }) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('asc');

  const onSortField = (field: string, updatedSortDirection: string): void => {
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
      {renderListItems(items, catalogId, sortField, sortDirection)}
    </div>
  );
};
