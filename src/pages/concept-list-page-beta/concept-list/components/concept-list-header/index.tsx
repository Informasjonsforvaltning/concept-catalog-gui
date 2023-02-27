import React, { FC, memo } from 'react';

import { ConceptField, SortDirection } from '../../../../../types/enums';
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
        field={ConceptField.TERM}
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>
    <SC.Column>
      <span className='header-item mr-1'>{localization.assignedUser}</span>
      <SortButtons
        field={ConceptField.ASSIGNED_USER}
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>

    <SC.Column>
      <span className='header-item mr-1'>{localization.modifiedAt}</span>
      <SortButtons
        field={ConceptField.MODIFY_TIME}
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>

    <SC.Column>
      <span className='header-item mr-1'>{localization.version}</span>
      <SortButtons
        field={ConceptField.VERSION}
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>

    <SC.Column>
      <span className='header-item mr-1'>{localization.status}</span>
      <SortButtons
        field={ConceptField.STATUS}
        sortField={sortField}
        sortType={sortDirection}
        onSortField={onSortField}
      />
    </SC.Column>
  </SC.ConceptListHeader>
);

export default memo(ConceptListHeader);
