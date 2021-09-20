import React, { FC, useState, useEffect, useReducer } from 'react';
import { compose } from 'redux';
import { Form, FormikProps, WithFormikConfig, withFormik } from 'formik';
import pick from 'lodash/pick';
import throttle from 'lodash/throttle';

import { Concept } from '../../../types';
import { Can } from '../../../casl/Can';
import { deepKeys } from '../../../lib/deep-keys';
import { localization } from '../../../lib/localization';
import { authService } from '../../../services/auth-service';

import { FormTemplate } from '../../../components/form-template/form-template.component';
import { StatusBar } from '../../../components/status-bar/status-bar.component';
import {
  setInputLanguages,
  toggleInputLanguage
} from '../../../components/language-picker/reducer/actions';
import {
  languagePickerReducer,
  initialState
} from '../../../components/language-picker/reducer/reducer';
import { LanguagePicker } from '../../../components/language-picker/language-picker.component';
import { ButtonToggle } from '../../../components/button-toggle/button-toggle.component';

import { Validity } from './validity/validity.component';
import { RelatedConcepts } from './related-concepts/related-concepts.component';
import { Term } from './term/term.component';
import { AllowedAndDiscouraged } from './allowed-and-discouraged-term/allowed-and-discouraged-term.component';
import { UseOfTerm } from './use-of-concept/useOfConcept.component';
import { ContactInfo } from './contactInfo/contactInfo.component';
import { patchWithPreProcess } from './utils';

import { schema as validationSchema } from './form-concept.schema';

export type FormValues = Pick<
  Concept,
  | 'anbefaltTerm'
  | 'definisjon'
  | 'kildebeskrivelse'
  | 'merknad'
  | 'tillattTerm'
  | 'frarådetTerm'
  | 'eksempel'
  | 'fagområde'
  | 'bruksområde'
  | 'omfang'
  | 'kontaktpunkt'
  | 'gyldigFom'
  | 'gyldigTom'
  | 'seOgså'
>;

interface ExternalProps {
  concept: Concept;
  dispatch: any;
  lastPatchedResponse: any;
  isSaving: boolean;
}

interface Props extends ExternalProps, FormikProps<FormValues> {}

export const FormConceptPure: FC<Props> = ({
  concept,
  isValid,
  lastPatchedResponse = {},
  errors
}) => {
  const {
    anbefaltTerm: termError,
    definisjon: definitionError,
    kildebeskrivelse: sourceError,
    omfang: useOfConceptError,
    kontaktpunkt: contactPointError
  } = errors;

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
    concept
      ? [...new Set(deepKeys(pick(concept, translatableFields), (_, v) => !!v))]
      : [];

  useEffect(() => {
    if (concept && !languagesDetermined) {
      dispatch(setInputLanguages(getUsedLanguages()));
      setLanguagesDetermined(true);
    }
  }, [concept]);

  const publisherId = concept?.ansvarligVirksomhet?.id;
  const isReadOnly = !authService.hasOrganizationWritePermission(publisherId);

  const [expandAll, setExpandAll] = useState(false);
  const [isExpandAllDirty, setExpandAllDirty] = useState(false);

  const toggleExpand = () => {
    setExpandAll(!expandAll);
    setExpandAllDirty(true);
  };

  return (
    <Form>
      <Can I='edit' of={{ __type: 'Language', publisher: publisherId }}>
        <LanguagePicker
          languages={state.languages}
          toggleInputLanguage={language =>
            dispatch(toggleInputLanguage(language))
          }
        />
      </Can>
      <div className='d-flex justify-content-end'>
        <ButtonToggle expanded={expandAll} toggle={toggleExpand} />
      </div>
      <FormTemplate
        title={localization.formTerm}
        showRequired={!isReadOnly}
        showInitially={isExpandAllDirty ? expandAll : true}
        error={!!termError || !!definitionError || !!sourceError}
      >
        <Term languages={state.languages} isReadOnly={isReadOnly} />
      </FormTemplate>
      <FormTemplate
        title={localization.formAllowedAndDiscouraged}
        showInitially={expandAll}
      >
        <AllowedAndDiscouraged languages={state.languages} />
      </FormTemplate>
      <FormTemplate
        title={localization.formUseOfConcept}
        showInitially={expandAll}
        error={!!useOfConceptError}
      >
        <UseOfTerm languages={state.languages} />
      </FormTemplate>
      <FormTemplate title={localization.formValidity} showInitially={expandAll}>
        <Validity />
      </FormTemplate>
      <FormTemplate
        title={localization.formRelatedConcepts}
        showInitially={expandAll}
      >
        <RelatedConcepts />
      </FormTemplate>
      <FormTemplate
        title={localization.formContactPoint}
        showInitially={expandAll}
        error={!!contactPointError}
      >
        <ContactInfo />
      </FormTemplate>
      <Can
        I='view a statusBar'
        of={{ __type: 'StatusBar', publisher: publisherId }}
      >
        <StatusBar
          concept={concept}
          isInitialInValidForm={!isValid}
          lastPatchedResponse={lastPatchedResponse}
        />
      </Can>
    </Form>
  );
};

const formikConfig: WithFormikConfig<Props, FormValues> = {
  mapPropsToValues: ({
    concept: {
      anbefaltTerm = { navn: {} },
      definisjon = { tekst: {} },
      kildebeskrivelse = null,
      merknad = {},
      tillattTerm = {},
      frarådetTerm = {},
      eksempel = {},
      fagområde = {},
      bruksområde = {},
      omfang = null,
      kontaktpunkt = null,
      gyldigFom = null,
      gyldigTom = null,
      seOgså = []
    }
  }: Props) => ({
    anbefaltTerm,
    definisjon,
    kildebeskrivelse,
    merknad,
    tillattTerm,
    frarådetTerm,
    eksempel,
    fagområde,
    bruksområde,
    omfang,
    kontaktpunkt,
    gyldigFom,
    gyldigTom,
    seOgså
  }),
  validationSchema,
  validate: throttle(patchWithPreProcess, 1500),
  validateOnMount: true,
  validateOnBlur: false,
  handleSubmit: () => {}
};

export const FormConcept = compose<FC<ExternalProps>>(withFormik(formikConfig))(
  FormConceptPure
);
