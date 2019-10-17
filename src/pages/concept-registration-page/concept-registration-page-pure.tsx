import React, { useContext, useEffect } from 'react';
import get from 'lodash/get';
import { StateContext, StateConsumer } from '../../app/context/stateContext';
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

export const ConceptRegistrationPagePure = ({ concept }: Props): JSX.Element => {
  const { dispatch } = useContext(StateContext);
  const anbefaltTerm = get(concept, ['anbefaltTerm', 'navn']);

  useEffect(() => {
    dispatch(conceptPatchSuccessAction(concept.id, {}, concept));
  }, []);

  return (
    <div className="container">
      <div className="col-12">
        <h1 className="pb-5">{getTranslateText(anbefaltTerm)}</h1>
        <FormConcept concept={concept} dispatch={dispatch} />
      </div>
    </div>
  );
};
