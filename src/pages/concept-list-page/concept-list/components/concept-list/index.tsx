import React, { FC, useState } from 'react';

import { Concept } from '../../../../../types';
import { ConceptField, SortDirection } from '../../../../../types/enums';
import { sortConceptsByKey } from '../../../../../utils/sort';

import {
  findOriginalConcepts,
  findRevisionsOfConcept,
  hasConceptAnyRevisions
} from '../../utils/concepts';
import ListItem from '../concept-list-item';
import ConceptListHeader from '../concept-list-header';
import CollapseItem from '../concept-list-collapse-item';

interface Props {
  items: Concept[];
}

export const ConceptList: FC<Props> = ({ items }) => {
  const [sortField, setSortField] = useState<string>(ConceptField.MODIFY_TIME);
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

  return (
    <div className='d-flex flex-column flex-fill'>
      <ConceptListHeader
        sortField={sortField}
        sortDirection={sortDirection}
        onSortField={onSortField}
      />
      {items &&
        findOriginalConcepts(items)
          .sort(sortConceptsByKey(sortField, sortDirection))
          .map((concept, index) =>
            hasConceptAnyRevisions(concept.originaltBegrep, items) ? (
              <CollapseItem
                key={index}
                concepts={findRevisionsOfConcept(concept.originaltBegrep, items)
                  .sort(sortConceptsByKey(sortField, sortDirection))
                  .sort(
                    (
                      { erSistPublisert: a = false }: Concept,
                      { erSistPublisert: b = false }: Concept
                    ) => Number(b) - Number(a)
                  )}
              />
            ) : (
              <ListItem key={`${concept?.id}-${index}`} concept={concept} />
            )
          )}
    </div>
  );
};
