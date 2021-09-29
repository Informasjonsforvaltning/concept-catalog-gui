import React from 'react';

import { SortDirection } from '../../types/enums';
import './sort-button.scss';

interface Props {
  field: string;
  sortField: string;
  sortType: SortDirection;
  onSortField: (field: string, sortDirection: SortDirection) => void;
}

export const SortButtons = ({
  field,
  sortField,
  sortType,
  onSortField
}: Props): JSX.Element | null => (
  <div className='d-flex flex-column'>
    <button
      type='button'
      name={`${field}asc`}
      className={`d-flex sortButton ${
        sortField === `${field}` && sortType === SortDirection.ASC
          ? 'visibilityHidden'
          : ''
      }`}
      onClick={(): void => onSortField(`${field}`, SortDirection.ASC)}
      title='Stigende'
    >
      <i className='fa fa-sort-up' />
    </button>
    <button
      type='button'
      name={`${field}desc`}
      className={`d-flex sortButton ${
        sortField === `${field}` && sortType === 'desc'
          ? 'visibilityHidden'
          : ''
      }`}
      onClick={(): void => onSortField(`${field}`, SortDirection.DESC)}
      title='Synkende'
    >
      <i className='fa fa-sort-down' />
    </button>
  </div>
);
