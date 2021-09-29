import React, { FC, memo } from 'react';
import { localization } from '../../../../../lib/localization';
import { SortButtons } from '../../../../../components/sort-button/sort-button.component';

interface Props {
  sortField: string;
  sortDirection: string;
  onSortField: (field: string, updatedSortDirection: string) => void;
}

const ConceptListHeader: FC<Props> = ({
  sortField,
  sortDirection,
  onSortField
}) => (
  <div className='row fdk-list-header'>
    <div className='col-3 d-flex align-items-center'>
      <span className='header-item mr-1'>{localization.preferredTerm}</span>
      <SortButtons
        field='anbefaltTerm.navn.nb'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </div>

    <div className='col-3 d-flex align-items-center'>
      <span className='header-item mr-1'>{localization.fieldOfStudy}</span>
      <SortButtons
        field='fagområde'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </div>

    <div className='col-3 d-flex align-items-center'>
      <span className='header-item mr-1'>{localization.validity}</span>
      <SortButtons
        field='valid'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </div>

    <div className='col-3 d-flex align-items-center'>
      <span className='header-item mr-1'>{localization.status}</span>
      <SortButtons
        field='status'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </div>
  </div>
);

export default memo(ConceptListHeader);
