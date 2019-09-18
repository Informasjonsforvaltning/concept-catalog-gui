import React, { useReducer } from 'react';

import { StatusBar } from '../../components/status-bar/status-bar.component';
import { StatusBarProvider } from '../../context/statusBarContext';
import { statusBarReducer } from '../../reducers/statusBarReducer';
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
  catalogId: string;
}

export const ConceptRegistrationPagePure = ({ concept, history, catalogId }: Props) => {
  const [statusBarState, dispatch] = useReducer(statusBarReducer, [{}]);
  const value = { statusBarState, dispatch };
  return (
    <div className="container">
      <div className="col-12">
        <FormConcept concept={concept} dispatch={dispatch} />
      </div>
      <StatusBarProvider value={value}>
        <StatusBar concept={concept} history={history} catalogId={catalogId} />
      </StatusBarProvider>
    </div>
  );
};
