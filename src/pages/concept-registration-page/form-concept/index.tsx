import React, { FC, useState, useEffect } from 'react';
import { compose } from '@reduxjs/toolkit';
import { Form, FormikProps, WithFormikConfig, withFormik } from 'formik';
import pick from 'lodash/pick';
// TODO import debounce from 'lodash/debounce';
import { Prompt, RouteComponentProps, withRouter } from 'react-router-dom';

import { Concept } from '../../../types';
import { Can } from '../../../casl/Can';
import { deepKeys } from '../../../lib/deep-keys';
import { getTranslateText } from '../../../lib/translateText';
import { localization } from '../../../lib/localization';
import { authService } from '../../../services/auth-service';

import { useAppSelector, useAppDispatch } from '../../../app/redux/hooks';
import { setLanguage, toggleLanguage } from '../../../features/language';

import { FormTemplate } from '../../../components/form-template/form-template.component';
import { LanguagePicker } from '../../../components/language-picker/language-picker.component';
import { ButtonToggle } from '../../../components/button-toggle/button-toggle.component';
import FormControl from '../../../components/form-control';

import { Validity } from './validity/validity.component';
import { RelatedConcepts } from './related-concepts/related-concepts.component';
import { Term } from './term/term.component';
import { AllowedAndDiscouraged } from './allowed-and-discouraged-term/allowed-and-discouraged-term.component';
import { UseOfTerm } from './use-of-concept/useOfConcept.component';
import { ContactInfo } from './contactInfo/contactInfo.component';
import { validateWithPreProcess, postWithPreProcess } from './utils';

import { schema as validationSchema } from './form-concept.schema';

import SC from './styled';
import { InternalInfo } from './internal-info';
import { getConfig } from '../../../config';

export type FormValues = Pick<
  Concept,
  | 'anbefaltTerm'
  | 'definisjon'
  | 'merknad'
  | 'tillattTerm'
  | 'frarådetTerm'
  | 'eksempel'
  | 'fagområde'
  | 'fagområdeKoder'
  | 'omfang'
  | 'kontaktpunkt'
  | 'gyldigFom'
  | 'gyldigTom'
  | 'seOgså'
  | 'erstattesAv'
  | 'assignedUser'
  | 'abbreviatedLabel'
  | 'begrepsRelasjon'
  | 'versjonsnr'
  | 'interneFelt'
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
  errors,
  history,
  match: {
    params: { catalogId, conceptId }
  },
  lastPatchedResponse
}) => {
  const {
    anbefaltTerm: termError,
    definisjon: definitionError,
    omfang: useOfConceptError,
    kontaktpunkt: contactPointError,
    begrepsRelasjon: begrepsRelasjonError
  } = errors;
  const [showUserPrompt, setShowUserPrompt] = useState<boolean>(true);
  const [patchCalled, setPatchCalled] = useState<boolean>(false);
  const [deleteCalled, setDeleteCalled] = useState<boolean>(false);

  const config = getConfig();

  const languageEntities = useAppSelector(state => state.languages.entities);

  const appDispatch = useAppDispatch();

  const translatableFields = [
    'anbefaltTerm',
    'definisjon',
    'tillattTerm',
    'frarådetTerm',
    'merknad',
    'eksempel',
    'fagområde'
  ];

  const getUsedLanguages = (): any[] =>
    concept
      ? [...new Set(deepKeys(pick(concept, translatableFields), (_, v) => !!v))]
      : [];

  useEffect(() => {
    if (concept) {
      appDispatch(setLanguage(getUsedLanguages()));
    }
  }, [concept]);

  const publisherId = concept?.ansvarligVirksomhet?.id;
  const isReadOnly = authService.isReadOnlyUser(publisherId);

  const [expandAll, setExpandAll] = useState(false);
  const [isExpandAllDirty, setExpandAllDirty] = useState(false);

  const toggleExpand = () => {
    setExpandAll(!expandAll);
    setExpandAllDirty(true);
  };

  const createNewConceptRevisionAndNavigate = () =>
    postWithPreProcess(conceptId, values).then(resourceId => {
      setShowUserPrompt(false);
      history.push(`/${catalogId}/${resourceId}`);
    });

  useEffect(() => {
    const handler = event => {
      event.preventDefault();
      event.returnValue = '';
    };
    // if the form is NOT unchanged, then set the onbeforeunload
    if (dirty && showUserPrompt && !(patchCalled || deleteCalled)) {
      window.addEventListener('beforeunload', handler);
      // clean it up, if the dirty state changes
      return () => {
        window.removeEventListener('beforeunload', handler);
      };
    }

    if (patchCalled) {
      history.go(0);
    }
    if (deleteCalled) {
      history.push(
        config.enableConceptCatalogFrontend
          ? `${config.conceptCatalogFrontendBaseUri}/${catalogId}`
          : `/${catalogId}`
      );
    }
    // since this is not dirty, don't do anything
    return () => {};
  }, [dirty, showUserPrompt, patchCalled, deleteCalled]);

  return (
    <SC.Page>
      <Prompt
        when={dirty && showUserPrompt && !(patchCalled || deleteCalled)}
        message={localization.unsavedPrompt}
      />
      <Can
        I='view a statusBar'
        of={{ __type: 'StatusBar', publisher: publisherId }}
      >
        <FormControl<FormValues>
          isFormDirty={dirty}
          onNewConceptRevision={createNewConceptRevisionAndNavigate}
          onPatch={() => {
            setPatchCalled(true);
          }}
          onDelete={() => {
            setDeleteCalled(true);
          }}
          isInitialInValidForm={!isValid}
          lastPatchedResponse={lastPatchedResponse}
          values={values}
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
        <div className='d-flex justify-content-between align-items-center'>
          <Can I='edit' of={{ __type: 'Language', publisher: publisherId }}>
            <LanguagePicker
              languages={languageEntities}
              toggleInputLanguage={language =>
                appDispatch(toggleLanguage(language))
              }
            />
          </Can>
          <ButtonToggle expanded={expandAll} toggle={toggleExpand} />
        </div>
        <FormTemplate
          title={localization.formTerm}
          showRequired={!isReadOnly}
          showInitially={isExpandAllDirty ? expandAll : true}
          error={!!termError || !!definitionError}
        >
          <Term languages={languageEntities} isReadOnly={isReadOnly} />
        </FormTemplate>
        <FormTemplate
          title={localization.formAllowedAndDiscouraged}
          showInitially={expandAll}
        >
          <AllowedAndDiscouraged languages={languageEntities} />
        </FormTemplate>
        <FormTemplate
          title={localization.formUseOfConcept}
          showInitially={expandAll}
          error={!!useOfConceptError}
        >
          <UseOfTerm languages={languageEntities} />
        </FormTemplate>
        <FormTemplate
          title={localization.formValidity}
          showInitially={expandAll}
        >
          <Validity />
        </FormTemplate>
        <FormTemplate
          title={localization.formRelatedConcepts}
          error={!!begrepsRelasjonError}
        >
          <RelatedConcepts
            languages={languageEntities}
            isReadOnly={isReadOnly}
          />
        </FormTemplate>
        <FormTemplate
          title={localization.formContactPoint}
          showInitially={expandAll}
          error={!!contactPointError}
        >
          <ContactInfo />
        </FormTemplate>
        <InternalInfo catalogId={catalogId} errors={errors} />
      </Form>
    </SC.Page>
  );
};

const formikConfig: WithFormikConfig<Props, FormValues> = {
  mapPropsToValues: ({
    concept: {
      id,
      anbefaltTerm = { navn: {} },
      definisjon = { tekst: {}, kildebeskrivelse: null },
      folkeligForklaring = { tekst: {}, kildebeskrivelse: null },
      rettsligForklaring = { tekst: {}, kildebeskrivelse: null },
      merknad = {},
      tillattTerm = {},
      frarådetTerm = {},
      eksempel = {},
      fagområde = {},
      fagområdeKoder = [],
      omfang = null,
      kontaktpunkt = null,
      gyldigFom = null,
      gyldigTom = null,
      seOgså = [],
      erstattesAv = [],
      assignedUser = '',
      abbreviatedLabel = null,
      begrepsRelasjon = [],
      versjonsnr = { major: 0, minor: 0, patch: 0 },
      interneFelt = {}
    }
  }: Props) => ({
    id,
    anbefaltTerm,
    definisjon,
    folkeligForklaring,
    rettsligForklaring,
    merknad,
    tillattTerm,
    frarådetTerm,
    eksempel,
    fagområde,
    fagområdeKoder,
    omfang,
    kontaktpunkt,
    gyldigFom,
    gyldigTom,
    seOgså,
    erstattesAv,
    assignedUser,
    abbreviatedLabel,
    begrepsRelasjon,
    versjonsnr,
    interneFelt
  }),
  validationSchema,
  validate: validateWithPreProcess,
  validateOnMount: true,
  validateOnBlur: false,
  handleSubmit: () => {}
};

export const FormConcept = compose<FC<ExternalProps>>(
  withRouter,
  withFormik(formikConfig)
)(FormConceptPure);
