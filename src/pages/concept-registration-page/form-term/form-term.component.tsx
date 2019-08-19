import _ from 'lodash';
import { withFormik } from 'formik';
import { FormTermPure } from './form-term-pure.component';
import { schema } from './form-term.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';
import { Concept } from '../../../domain/Concept';

export interface FormValues {
  anbefaltTerm: string;
  definisjon: string;
}

interface FormProps {
  concept: Concept;
  dispatch: Function;
}

const json = {
  kildebeskrivelse: {
    forholdTilKilde: 'custom',
    kilde: []
  }
};
const config = {
  mapPropsToValues: ({ concept, dispatch }: FormProps) => ({
    anbefaltTerm: _.get(concept, 'anbefaltTerm') || '',
    definisjon: _.get(concept, 'definisjon') || '',
    kildebeskrivelse: concept.kildebeskrivelse || {},
    merknad: _.get(concept, 'merknad') || '',
    dispatch: dispatch
  }),
  validationSchema: schema,
  validate: _.throttle(patchConceptFromForm, 250),
  handleSubmit() {}
};

export const FormTerm = withFormik<FormProps, FormValues>(config)(FormTermPure);
