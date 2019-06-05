import React, { useState } from 'react';
import _ from 'lodash';

import { localization } from '../../../lib/localization';
import { ListItem as ListItemInterface } from '../../../domain/ListItem';
import { ListItem } from './list-item/list-item.component';
import { SortButtons } from '../../../components/sort-button/sort-button.component';
import './concept-list.scss';

interface Props {
  items: ListItemInterface[];
}

const renderListHeader = (sortField, sortDirection, onSortField): JSX.Element => (
  <div className="row fdk-list-header">
    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization['preferredTerm']}</span>
      <SortButtons field="title" sortField={sortField} sortType={sortDirection} onSortField={onSortField} />
    </div>

    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization['fieldOfStudy']}</span>
      <SortButtons field="theme" sortField={sortField} sortType={sortDirection} onSortField={onSortField} />
    </div>

    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization['validity']}</span>
      <SortButtons field="valid" sortField={sortField} sortType={sortDirection} onSortField={onSortField} />
    </div>

    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization['status']}</span>
      <SortButtons field="status" sortField={sortField} sortType={sortDirection} onSortField={onSortField} />
    </div>
  </div>
);

const renderListItems = (items, sortField, sortDirection): JSX.Element | null => {
  if (!items) {
    return null;
  }
  return _.orderBy(items, sortField, [sortDirection]).map(
    (item, index): JSX.Element => {
      return (
        <ListItem
          key={`${_.get(item, 'title')}-${index}`}
          col1={_.get(item, 'title')}
          col2={_.get(item, 'theme')}
          col3={_.get(item, 'valid')}
          status={_.get(item, 'status')}
          path="/tester"
        />
      );
    }
  );
};

export const ConceptList = ({ items }: Props): JSX.Element | null => {
  const [sortField, setSortField] = useState();
  const [sortDirection, setSortDirection] = useState<string>('asc');

  const onSortField = (field, sortDirection): void => {
    setSortField(field);
    setSortDirection(sortDirection);
  };

  return (
    <div className="d-flex flex-column flex-fill">
      {renderListHeader(sortField, sortDirection, onSortField)}
      {renderListItems(items, sortField, sortDirection)}
    </div>
  );
};
