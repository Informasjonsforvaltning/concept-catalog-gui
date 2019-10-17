import React from 'react';
import _ from 'lodash';
import { getTranslateText } from '../../lib/translateText';
import { ConceptList } from './concept-list/concept-list.component';
import { ConceptTitle } from './concept-title/concept-title.component';
import { NewConceptButton } from '../../components/new-concept-button/new-concept-button.component';
import { postConcept } from '../../api/concept-catalogue-api';

interface Props {
  myProp: any;
  history: any;
  concepts: object;
  publisher: object;
  catalogId: string;
}

const createConcept = catalogId => ({
  anbefaltTerm: {
    navn: {}
  },
  status: 'utkast',
  ansvarligVirksomhet: {
    id: catalogId
  }
});

const createNewConceptAndNavigate = ({ history, catalogId }) =>
  postConcept(createConcept(catalogId)).then(resourceId => history.push(`/${catalogId}/${resourceId}`));

export const ConceptListPagePure = ({ history, concepts, publisher, catalogId }: Props): JSX.Element => (
  <div className="container">
    <div className="row mb-2">
      <ConceptTitle title={getTranslateText(_.get(publisher, 'prefLabel'))} />
    </div>
    <div className="mb-2">
      <NewConceptButton parentOnClick={() => createNewConceptAndNavigate({ history, catalogId })} />
    </div>
    <div className="mb-2">
      <ConceptList items={concepts} catalogId={catalogId} />
    </div>
  </div>
);
