import _ from 'lodash';
import { withFormik } from 'formik';

import { FormTermPure } from './form-term-pure.component';
import { schema } from './form-term.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';

export interface FormValues {
  anbefaltTerm: string;
  definisjon: string;
}

interface FormProps {
  concept: object;
}

const config = {
  mapPropsToValues: ({ concept }: FormProps) => ({
    anbefaltTerm: _.get(concept, 'anbefaltTerm') || '',
    definisjon: _.get(concept, 'definisjon') || '',
    merknad: _.get(concept, 'merknad') || ''
  }),
  validationSchema: schema,
  validate: _.throttle(patchConceptFromForm, 250),
  handleSubmit() {}
};

export const FormTerm = withFormik<FormProps, FormValues>(config)(FormTermPure);
