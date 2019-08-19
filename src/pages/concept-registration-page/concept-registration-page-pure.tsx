import React, { useReducer } from 'react';

import { localization } from '../../lib/localization';
import { FormTemplate } from '../../components/form-template/form-template.component';
import { FormTerm } from './form-term/form-term.component';
import { FormAllowedAndDiscouraged } from './form-allowed-and-discouraged-term/form-allowed-and-discouraged-term.component';
import { FormUseOfTerm } from './form-use-of-concept/form-useOfConcept.component';
import { FormContactInfo } from './form-contactInfo/form-contactInfo.component';
import { StatusBar } from '../../components/status-bar/status-bar.component';
import { StatusBarProvider } from '../../context/statusBarContext';
import { statusBarReducer } from '../../reducers/statusBarReducer';

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
        <FormTemplate title={localization.formTerm} required={true}>
          <FormTerm concept={concept} dispatch={dispatch} />
        </FormTemplate>
        <FormTemplate title={localization.formAllowedAndDiscouraged}>
          <FormAllowedAndDiscouraged concept={concept} dispatch={dispatch} />
        </FormTemplate>
        <FormTemplate title={localization.formUseOfConcept}>
          <FormUseOfTerm concept={concept} dispatch={dispatch} />
        </FormTemplate>
        <FormTemplate title={localization.formContactPoint}>
          <FormContactInfo concept={concept} dispatch={dispatch} />
        </FormTemplate>
      </div>
      <StatusBarProvider value={value}>
        <StatusBar concept={concept} history={history} catalogId={catalogId} />
      </StatusBarProvider>
    </div>
  );
};
