import React, { FC, memo } from 'react';

import { SortDirection } from '../../../../../types/enums';
import { localization } from '../../../../../lib/localization';
import { SortButtons } from '../../../../../components/sort-button/sort-button.component';

import SC from './styled';

interface Props {
  sortField: string;
  sortDirection: SortDirection;
  onSortField: (field: string, updatedSortDirection: SortDirection) => void;
}

const ConceptListHeader: FC<Props> = ({
  sortField,
  sortDirection,
  onSortField
}) => (
  <SC.ConceptListHeader>
    <SC.Column>
      <span className='header-item mr-1'>{localization.preferredTerm}</span>
      <SortButtons
        field='anbefaltTerm.navn.nb'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>

    <SC.Column>
      <span className='header-item mr-1'>{localization.fieldOfStudy}</span>
      <SortButtons
        field='fagområde'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>

    <SC.Column>
      <span className='header-item mr-1'>{localization.validity}</span>
      <SortButtons
        field='valid'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>

    <SC.Column>
      <span className='header-item mr-1'>{localization.version}</span>
      <SortButtons
        field='versjonsnr'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>

    <SC.Column>
      <span className='header-item mr-1'>{localization.status}</span>
      <SortButtons
        field='status'
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>
  </SC.ConceptListHeader>
);

export default memo(ConceptListHeader);
