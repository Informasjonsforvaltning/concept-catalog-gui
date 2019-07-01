import _ from 'lodash';
import { withFormik } from 'formik';

import { schema } from './form-allowed-and-discouraged-term.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';
import { FormAllowedAndDiscouragedPure } from './form-allowed-and-discouraged-term-pure.component';

interface TillattTerm {
  [index: number]: string;
}

interface FraraadetTerm {
  [index: number]: string;
}

export interface FormValues {
  tillattTerm: TillattTerm;
  frarådetTerm: FraraadetTerm;
}

interface FormProps {
  concept: object;
}

const config = {
  mapPropsToValues: ({ concept }: FormProps) => ({
    tillattTerm: _.get(concept, 'tillattTerm') || [],
    frarådetTerm: _.get(concept, 'frarådetTerm') || []
  }),
  validationSchema: schema,
  validate: _.throttle(patchConceptFromForm, 250),
  handleSubmit() {}
};

export const FormAllowedAndDiscouraged = withFormik<FormProps, FormValues>(config)(FormAllowedAndDiscouragedPure);
