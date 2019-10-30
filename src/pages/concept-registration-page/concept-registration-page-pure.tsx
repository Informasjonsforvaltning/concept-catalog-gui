import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useDispatch, useGlobalState } from '../../app/context/stateContext';
import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept/form-concept.component';
import { conceptPatchSuccessAction } from '../../app/reducers/stateReducer';
import { Concept } from '../../domain/Concept';

import { getTranslateText } from '../../lib/translateText';

interface Kilde {
  uri: string;
  tekst: string;
}

interface Props {
  concept: Concept;
  history: object;
}

export const ConceptRegistrationPagePure: React.FC<Props> = ({ concept }) => {
  const stateConcept = useGlobalState(concept.id);
  const dispatch = useDispatch();
  const anbefaltTerm = get(concept, ['anbefaltTerm', 'navn']);

  useEffect(() => {
    dispatch(conceptPatchSuccessAction(concept.id, {}, concept));
  }, []);

  return (
    <div className="container">
      <div className="col-12">
        <h1 className="pb-5">{getTranslateText(anbefaltTerm)}</h1>
        <FormConcept concept={concept} dispatch={dispatch} lastPatchedValues={get(stateConcept, 'lastPatchedValues')} />
      </div>
    </div>
  );
};
