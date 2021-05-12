import React, { useState, useEffect, useReducer } from 'react';
import { Form } from 'formik';
import pick from 'lodash/pick';
import get from 'lodash/get';

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
import { Can } from '../../../casl/Can';
import { authService } from '../../../services/auth-service';
import { ButtonToggle } from '../../../components/button-toggle/button-toggle.component';
import { Validity } from './validity/validity.component';
import { RelatedConcepts } from './related-concepts/related-concepts.component';

interface Props {
  concept: Concept;
  isValid: boolean;
  lastPatchedResponse: object;
}

export const FormConceptPure: React.FC<Props> = ({ concept, isValid, lastPatchedResponse = {} }) => {
  const [languagesDetermined, setLanguagesDetermined] = useState(false);

  const [state, dispatch] = useReducer(languagePickerReducer, initialState);

  const translatableFields = [
    'anbefaltTerm',
    'definisjon',
    'tillattTerm',
    'frarådetTerm',
    'merknad',
    'eksempel',
    'fagområde',
    'bruksområde'
  ];

  const getUsedLanguages = (): any[] =>
    concept ? [...new Set(deepKeys(pick(concept, translatableFields), (_, v) => !!v))] : [];

  useEffect(() => {
    if (concept && !languagesDetermined) {
      dispatch(setInputLanguages(getUsedLanguages()));
      setLanguagesDetermined(true);
    }
  }, [concept]);

  const publisherId = get(concept, ['ansvarligVirksomhet', 'id']);
  const isReadOnly = !authService.hasOrganizationWritePermission(publisherId);

  const [expandAll, setExpandAll] = useState(false);
  const [isExpandAllDirty, setExpandAllDirty] = useState(false);

  const toggleExpand = () => {
    setExpandAll(!expandAll);
    setExpandAllDirty(true);
  };

  return (
    <Form>
      <Can I="edit" of={{ __type: 'Language', publisher: publisherId }}>
        <LanguagePicker
          languages={state.languages}
          toggleInputLanguage={language => dispatch(toggleInputLanguage(language))}
        />
      </Can>
      <div className="d-flex justify-content-end">
        <ButtonToggle expanded={expandAll} toggle={toggleExpand} />
      </div>
      <FormTemplate
        title={localization.formTerm}
        showRequired={!isReadOnly}
        showInitially={isExpandAllDirty ? expandAll : true}
      >
        <Term languages={state.languages} isReadOnly={isReadOnly} />
      </FormTemplate>
      <FormTemplate title={localization.formAllowedAndDiscouraged} showInitially={expandAll}>
        <AllowedAndDiscouraged languages={state.languages} />
      </FormTemplate>
      <FormTemplate title={localization.formUseOfConcept} showInitially={expandAll}>
        <UseOfTerm languages={state.languages} />
      </FormTemplate>
      <FormTemplate title={localization.formValidity} showInitially={expandAll}>
        <Validity />
      </FormTemplate>
      <FormTemplate title={localization.formRelatedConcepts} showInitially={expandAll}>
        <RelatedConcepts />
      </FormTemplate>
      <FormTemplate title={localization.formContactPoint} showInitially={expandAll}>
        <ContactInfo />
      </FormTemplate>
      <Can I="view a statusBar" of={{ __type: 'StatusBar', publisher: publisherId }}>
        <StatusBar concept={concept} isInitialInValidForm={!isValid} lastPatchedResponse={lastPatchedResponse} />
      </Can>
    </Form>
  );
};
