import React, { useState } from 'react';
import _ from 'lodash';

import { localization } from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';
import { ListItem } from './list-item/list-item.component';
import { SortButtons } from '../../../components/sort-button/sort-button.component';
import './concept-list.scss';

interface Props {
  items: any;
  catalogId: string;
}

const renderListHeader = (sortField, sortDirection, onSortField): JSX.Element => (
  <div className="row fdk-list-header">
    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization['preferredTerm']}</span>
      <SortButtons
        field={`prefLabel.${localization.getLanguage()}`}
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </div>

    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization['fieldOfStudy']}</span>
      <SortButtons
        field={`subject.${localization.getLanguage()}`}
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
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

const renderListItems = (items, catalogId, sortField, sortDirection): JSX.Element | null => {
  if (!items) {
    return null;
  }
  // TODO fix status, validity and path when ready from api
  return _.orderBy(items, sortField, [sortDirection]).map(
    (item, index): JSX.Element => {
      return (
        <ListItem
          key={`${_.get(item, 'id')}-${index}`}
          col1={getTranslateText(_.get(item, 'anbefaltTerm'))}
          col2={getTranslateText(_.get(item, 'fagområde'))}
          col3=""
          status={_.get(item, 'status')}
          path={`${catalogId}/${_.get(item, 'id')}`}
        />
      );
    }
  );
};

export const ConceptList = ({ items, catalogId }: Props): JSX.Element | null => {
  const [sortField, setSortField] = useState();
  const [sortDirection, setSortDirection] = useState<string>('asc');

  const onSortField = (field, sortDirection): void => {
    setSortField(field);
    setSortDirection(sortDirection);
  };

  return (
    <div className="d-flex flex-column flex-fill">
      {renderListHeader(sortField, sortDirection, onSortField)}
      {renderListItems(items, catalogId, sortField, sortDirection)}
    </div>
  );
};
