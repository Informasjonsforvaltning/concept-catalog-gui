import React, { FunctionComponent } from 'react';
import _ from 'lodash';

import { useConceptsState } from '../../globalState/modules/concepts';
import { ConceptList } from './concept-list/concept-list.component';

export const ConceptListPage: FunctionComponent = (): JSX.Element => {
  const catalogIdJustForTesting = '101010';
  const [conceptsState, conceptsActions] = useConceptsState();
  conceptsActions.fetchConceptsIfNeededAction(catalogIdJustForTesting);

  return (
    <div className="container">
      <div className="row mb-2">
        <ConceptList items={_.get(conceptsState, [catalogIdJustForTesting, 'items'])} />
      </div>
    </div>
  );
};
