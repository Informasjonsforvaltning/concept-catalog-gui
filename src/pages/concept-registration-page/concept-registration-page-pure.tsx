import React, { useReducer } from 'react';

import { StatusBarProvider } from '../../components/status-bar/context/statusBarContext';
import { statusBarReducer } from '../../components/status-bar/reducers/statusBarReducer';
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
  const [statusBarState, dispatch] = useReducer(statusBarReducer, [{}]);
  const value = { statusBarState, dispatch };
  return (
    <div className="container">
      <div className="col-12">
        <StatusBarProvider value={value}>
          <FormConcept concept={concept} dispatch={dispatch} />
        </StatusBarProvider>
      </div>
    </div>
  );
};
