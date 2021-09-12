import React from 'react';
import './sort-button.scss';

interface Props {
  field: string;
  sortField: string;
  sortType: string;
  onSortField: (field: string, sortDirection: string) => void;
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
        sortField === `${field}` && sortType === 'asc' ? 'visibilityHidden' : ''
      }`}
      onClick={(): void => onSortField(`${field}`, 'asc')}
      title='Stigende'
    >
      <i className='fa fa-sort-up fdk-color-white' />
    </button>
    <button
      type='button'
      name={`${field}desc`}
      className={`d-flex sortButton ${
        sortField === `${field}` && sortType === 'desc'
          ? 'visibilityHidden'
          : ''
      }`}
      onClick={(): void => onSortField(`${field}`, 'desc')}
      title='Synkende'
    >
      <i className='fa fa-sort-down fdk-color-white' />
    </button>
  </div>
);
