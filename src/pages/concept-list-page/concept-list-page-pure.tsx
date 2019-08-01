import React from 'react';
import _ from 'lodash';
import { getTranslateText } from '../../lib/translateText';
import { ConceptList } from './concept-list/concept-list.component';
import { ConceptTitle } from './concept-title/concept-title.component';
import { NewConceptButton } from '../../components/new-concept-button/new-concept-button.component';
import { postConcept } from '../../api/concept-registration-api';

interface Props {
  myProp: any;
  history: any;
  concepts: object;
  publisher: object;
  catalogId: string;
}

export const ConceptListPagePure = ({ history, concepts, publisher, catalogId }: Props): JSX.Element => {
  const createNewConceptAndNavigate = () => {
    const body = {
      anbefaltTerm: '',
      status: 'utkast',
      ansvarligVirksomhet: {
        id: catalogId
      }
    };

    postConcept(body).then(response => {
      // Get conceptId from response
      const location = _.get(response, 'headers').get('Location');
      const conceptId = location.split('/').pop();

      // Redirect
      history.push(`/${catalogId}/${conceptId}`);
    });
  };

  return (
    <div className="container">
      <div className="row mb-2">
        <ConceptTitle title={getTranslateText(_.get(publisher, 'prefLabel'))} />
      </div>
      <div className="mb-2">
        <NewConceptButton parentOnClick={createNewConceptAndNavigate} />
      </div>
      <div className="mb-2">
        <ConceptList items={concepts} catalogId={catalogId} />
      </div>
    </div>
  );
};
