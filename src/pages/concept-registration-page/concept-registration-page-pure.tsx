import React, { useContext, useEffect } from 'react';

import { StateContext } from '../../app/context/stateContext';
import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept/form-concept.component';
import { conceptPatchSuccessAction } from '../../app/reducers/stateReducer';
import { Concept } from '../../domain/Concept';

interface Kilde {
  uri: string;
  tekst: string;
}

interface Props {
  concept: Concept;
  history: object;
}

export const ConceptRegistrationPagePure = ({ concept }: Props) => {
  const { dispatch } = useContext(StateContext);

  useEffect(() => {
    dispatch(conceptPatchSuccessAction(concept.id, {}, concept));
  }, []);

  return (
    <div className="container">
      <div className="col-12">
        <FormConcept concept={concept} dispatch={dispatch} />
      </div>
    </div>
  );
};
