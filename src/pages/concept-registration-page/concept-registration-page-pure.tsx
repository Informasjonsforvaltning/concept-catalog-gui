import React, { useContext } from 'react';

import { StateContext } from '../../app/context/stateContext';
import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept/form-concept.component';
interface Kilde {
  uri: string;
  tekst: string;
}

interface Concept {
  kildebeskrivelse: {
    forholdTilKilde: string;
    kilde: Kilde[];
  };
}

interface Props {
  concept: Concept;
  history: object;
}

export const ConceptRegistrationPagePure = ({ concept }: Props) => {
  const { dispatch } = useContext(StateContext);
  return (
    <div className="container">
      <div className="col-12">
        <FormConcept concept={concept} dispatch={dispatch} />
      </div>
    </div>
  );
};
