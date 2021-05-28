import _ from 'lodash';
import { withFormik } from 'formik';
import { FormConceptPure } from './form-concept-pure.component';
import { schema } from './form-concept.schema';
import { Concept } from '../../../domain/Concept';
import { validateConceptForm } from '../../../lib/validateConceptForm';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';

interface FormProps {
  concept: Concept;
  dispatch: Function;
  lastPatchedResponse: object;
  isSaving: boolean;
}

type FormValues = Pick<
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

const pruneEmptySources = kildebeskrivelse =>
  kildebeskrivelse?.kilde
    ? {
        ...kildebeskrivelse,
        kilde: kildebeskrivelse.kilde.filter(({ uri, tekst }) => !!(uri || tekst))
      }
    : null;

const wrapStrings = ({ nb, nn, en }) => ({
  ...(nb && { nb: Array.isArray(nb) ? nb : [nb] }),
  ...(nn && { nn: Array.isArray(nn) ? nn : [nn] }),
  ...(en && { en: Array.isArray(en) ? en : [en] })
});

const preProcessValues = ({ kildebeskrivelse, merknad, eksempel, bruksområde, ...conceptValues }) => ({
  ...conceptValues,
  kildebeskrivelse: pruneEmptySources(kildebeskrivelse),
  merknad: wrapStrings(merknad),
  eksempel: wrapStrings(eksempel),
  bruksområde: wrapStrings(bruksområde)
});

const patchWithPreProcess = (values, { concept, dispatch, lastPatchedResponse, isSaving }) => {
  const processedValues = preProcessValues(values);
  patchConceptFromForm(processedValues, { concept, dispatch, lastPatchedResponse, isSaving });
  validateConceptForm(processedValues, schema, concept, dispatch);
};

const config = {
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
  }: FormProps) => ({
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
  validationSchema: schema,
  validate: _.throttle(patchWithPreProcess, 1500),
  initialValues: ({ concept }: FormProps) => concept,
  validateOnMount: true,
  validateOnBlur: false,
  handleSubmit() {}
};

export const FormConcept = withFormik<FormProps, FormValues>(config)(FormConceptPure);
