import React from 'react';
import _ from 'lodash';
import { getTranslateText } from '../../lib/translateText';
import { ConceptList } from './concept-list/concept-list.component';
import { ConceptTitle } from './concept-title/concept-title.component';
import { NewConceptButton } from '../../components/new-concept-button/new-concept-button.component';

interface Props {
  concepts: object;
  publisher: object;
}

export const ConceptListPagePure = ({ concepts, publisher }: Props): JSX.Element => {
  return (
    <div className="container">
      <div className="row mb-2">
        <ConceptTitle title={getTranslateText(_.get(publisher, 'prefLabel'))} />
      </div>
      <div className="mb-2">
        <NewConceptButton />
      </div>
      <div className="mb-2">
        <ConceptList items={concepts} />
      </div>
    </div>
  );
};
