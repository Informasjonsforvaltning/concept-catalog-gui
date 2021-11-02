import React, { FC, useState, useEffect, useReducer } from 'react';
import { compose } from 'redux';
import { Form, FormikProps, WithFormikConfig, withFormik } from 'formik';
import pick from 'lodash/pick';
import throttle from 'lodash/throttle';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Concept } from '../../../types';
import { Can } from '../../../casl/Can';
import { deepKeys } from '../../../lib/deep-keys';
import { getTranslateText } from '../../../lib/translateText';
import { localization } from '../../../lib/localization';
import { authService } from '../../../services/auth-service';

import { FormTemplate } from '../../../components/form-template/form-template.component';
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
import FormControl from '../../../components/form-control';

import { Validity } from './validity/validity.component';
import { RelatedConcepts } from './related-concepts/related-concepts.component';
import { Term } from './term/term.component';
import { AllowedAndDiscouraged } from './allowed-and-discouraged-term/allowed-and-discouraged-term.component';
import { UseOfTerm } from './use-of-concept/useOfConcept.component';
import { ContactInfo } from './contactInfo/contactInfo.component';
import { patchWithPreProcess, postWithPreProcess } from './utils';

import { schema as validationSchema } from './form-concept.schema';

import SC from './styled';

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

interface RouteParams {
  catalogId: string;
  conceptId: string;
}

interface ExternalProps {
  concept: Concept;
  dispatch: any;
  lastPatchedResponse: any;
  isSaving: boolean;
}

interface Props
  extends ExternalProps,
    FormikProps<FormValues>,
    RouteComponentProps<RouteParams> {}

export const FormConceptPure: FC<Props> = ({
  concept,
  isValid,
  dirty,
  values,
  lastPatchedResponse = {},
  errors,
  history,
  match: {
    params: { catalogId, conceptId }
  }
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

  const createNewConceptRevisionAndNavigate = () =>
    postWithPreProcess(conceptId, values).then(resourceId => {
      history.push(`/${catalogId}/${resourceId}`);
    });

  return (
    <SC.Page>
      <Can
        I='view a statusBar'
        of={{ __type: 'StatusBar', publisher: publisherId }}
      >
        <FormControl
          isFormDirty={dirty}
          status={concept.status ?? ''}
          erSistPublisert={concept.erSistPublisert}
          createNewConceptRevisionAndNavigate={
            createNewConceptRevisionAndNavigate
          }
          concept={concept}
          lastPatchedResponse={lastPatchedResponse}
          isInitialInValidForm={!isValid}
        />
      </Can>
      <SC.Title>
        {getTranslateText(concept?.anbefaltTerm?.navn) ||
          localization.registerNewConcept}
      </SC.Title>
      <SC.Version>
        {localization.version} {concept.versjonsnr?.major}.
        {concept.versjonsnr?.minor}.{concept.versjonsnr?.patch}
      </SC.Version>
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
        <FormTemplate
          title={localization.formValidity}
          showInitially={expandAll}
        >
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
      </Form>
    </SC.Page>
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

export const FormConcept = compose<FC<ExternalProps>>(
  withRouter,
  withFormik(formikConfig)
)(FormConceptPure);
