import React, { useState, useEffect, useReducer } from 'react';
import { Form } from 'formik';
import pick from 'lodash/pick';

import { Term } from './term/term.component';
import { AllowedAndDiscouraged } from './allowed-and-discouraged-term/allowed-and-discouraged-term.component';
import { UseOfTerm } from './use-of-concept/useOfConcept.component';
import { ContactInfo } from './contactInfo/contactInfo.component';
import { localization } from '../../../lib/localization';
import { FormTemplate } from '../../../components/form-template/form-template.component';
import { StatusBar } from '../../../components/status-bar/status-bar.component';
import { setInputLanguages, toggleInputLanguage } from '../../../components/language-picker/reducer/actions';
import { languagePickerReducer, initialState } from '../../../components/language-picker/reducer/reducer';
import { deepKeys } from '../../../lib/deep-keys';
import { LanguagePicker } from '../../../components/language-picker/language-picker.component';
import { Concept } from '../../../domain/Concept';

interface Props {
  concept: Concept;
  isValid: boolean;
}

export const FormConceptPure: React.FC<Props> = ({ concept, isValid }) => {
  const [languagesDetermined, setLanguagesDetermined] = useState(false);

  const [state, dispatch] = useReducer(languagePickerReducer, initialState);

  const translatableFields = ['anbefaltTerm', 'definisjon'];

  const getUsedLanguages = (): any[] =>
    concept ? [...new Set(deepKeys(pick(concept, translatableFields), (_, v) => !!v))] : [];

  useEffect(() => {
    if (concept && !languagesDetermined) {
      dispatch(setInputLanguages(getUsedLanguages()));
      setLanguagesDetermined(true);
    }
  }, [concept]);

  return (
    <Form>
      <LanguagePicker
        languages={state.languages}
        toggleInputLanguage={language => dispatch(toggleInputLanguage(language))}
      />
      <FormTemplate title={localization.formTerm} required>
        <Term languages={state.languages} />
      </FormTemplate>
      <FormTemplate title={localization.formAllowedAndDiscouraged}>
        <AllowedAndDiscouraged />
      </FormTemplate>
      <FormTemplate title={localization.formUseOfConcept}>
        <UseOfTerm />
      </FormTemplate>
      <FormTemplate title={localization.formContactPoint}>
        <ContactInfo />
      </FormTemplate>
      <StatusBar concept={concept} isInitialInValidForm={!isValid} />
    </Form>
  );
};
