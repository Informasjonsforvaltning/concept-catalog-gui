import React, { useState } from 'react';
import _ from 'lodash';

import { localization } from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';
import { dateStringToDate, isDateBeforeToday, isDateAfterToday } from '../../../lib/date-utils';
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
      <span className="header-item mr-1">{localization.preferredTerm}</span>
      <SortButtons
        field="anbefaltTerm.navn.nb"
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </div>

    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization.fieldOfStudy}</span>
      <SortButtons field="fagområde" sortField={sortField} sortType={sortDirection} onSortField={onSortField} />
    </div>

    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization.validity}</span>
      <SortButtons field="valid" sortField={sortField} sortType={sortDirection} onSortField={onSortField} />
    </div>

    <div className="col-3 d-flex align-items-center">
      <span className="header-item mr-1">{localization.status}</span>
      <SortButtons field="status" sortField={sortField} sortType={sortDirection} onSortField={onSortField} />
    </div>
  </div>
);

const determineValidity = (validFromIncluding, validToIncluding) => {
  const isExpired = isDateBeforeToday(dateStringToDate(validToIncluding));
  const isWillBeValid = isDateAfterToday(dateStringToDate(validFromIncluding));
  if (isExpired) {
    return localization.expired;
  }
  if (isWillBeValid) {
    return localization.willBeValid;
  }
  return localization.valid;
};

const renderListItems = (items, catalogId, sortField, sortDirection): JSX.Element | null => {
  if (!items) {
    return null;
  }

  const iteratees = i => {
    const f: any = getTranslateText(_.get(i, sortField));
    return f instanceof Array ? f[0]?.toLowerCase() : f?.toLowerCase();
  };

  return _.orderBy(items, [iteratees], [sortDirection]).map(
    ({ id, fagområde, status, anbefaltTerm, gyldigFom, gyldigTom }, index): JSX.Element => (
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

export const ConceptList = ({ items, catalogId }: Props): JSX.Element | null => {
  const [sortField, setSortField] = useState();
  const [sortDirection, setSortDirection] = useState<string>('asc');

  const onSortField = (field, updatedSortDirection): void => {
    setSortField(field);
    setSortDirection(updatedSortDirection);
  };

  return (
    <div className="d-flex flex-column flex-fill">
      {renderListHeader(sortField, sortDirection, onSortField)}
      {renderListItems(items, catalogId, sortField, sortDirection)}
    </div>
  );
};
