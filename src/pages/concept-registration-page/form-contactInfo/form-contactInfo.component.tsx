import _ from 'lodash';
import { withFormik } from 'formik';

import { schema } from './form-contactInfo.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';
import { FormContactInfoPure } from './form-contactInfo-pure.component';

export interface FormValues {
  email: string;
  hasTelephone: string;
}

interface FormProps {
  concept: object;
}

const config = {
  mapPropsToValues: ({ concept }: FormProps) => ({
    email: _.get(concept, 'email') || '',
    hasTelephone: _.get(concept, 'hasTelephone') || ''
  }),
  validationSchema: schema,
  validate: _.throttle(patchConceptFromForm, 250),
  handleSubmit() {}
};

export const FormContactInfo = withFormik<FormProps, FormValues>(config)(FormContactInfoPure);
