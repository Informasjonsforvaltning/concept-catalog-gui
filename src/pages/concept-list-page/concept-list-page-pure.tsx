import React from 'react';
import _ from 'lodash';
import { getTranslateText } from '../../lib/translateText';
import { ConceptList } from './concept-list/concept-list.component';
import { ConceptTitle } from './concept-title/concept-title.component';
import { AddConceptButton } from '../../components/add-concept-button/add-concept-button.component';
import { postConcept } from '../../api/concept-catalogue-api';
import { Can } from '../../casl/Can';
import { ImportConceptButton } from '../../components/import-concept-button/import-concept-button.component';
import { mapConcepts } from '../../app/reducers/conceptMapper';
import { Concept } from '../../domain/Concept';

interface Props {
  history: any;
  concepts: Concept[];
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

const getTitle = (publisher: object): string => {
  return getTranslateText(_.get(publisher, 'prefLabel')) || _.get(publisher, 'name');
};

const createNewConceptAndNavigate = ({ history, catalogId }) =>
  postConcept(createConcept(catalogId)).then(resourceId => history.push(`/${catalogId}/${resourceId}`));

export const ConceptListPagePure = ({ history, concepts, publisher, catalogId }: Props): JSX.Element => {
  const [fileParsingError, setError] = React.useState();
  const [concept, setConcept] = React.useState(concepts);
  return (
    <div className="container">
      <div className="row mb-2">
        <ConceptTitle title={getTitle(publisher)} />
      </div>
      <Can I="create a concept" of={{ __type: 'Concept', publisher: catalogId }}>
        <div className="d-flex flex-row justify-content-start row">
          <div className="p-2">
            <ImportConceptButton onUpload={event => mapConcepts(event, setError, catalogId, setConcept)} />
          </div>
          <div className="p-2">
            <AddConceptButton parentOnClick={() => createNewConceptAndNavigate({ history, catalogId })} />
          </div>
        </div>
        {fileParsingError && (
          <div className="alert alert-danger"> Feil ved import av fil. Teknisk feilmelding: {fileParsingError}</div>
        )}
      </Can>
      <div className="mb-2">
        <ConceptList items={concept} catalogId={catalogId} />
      </div>
    </div>
  );
};
