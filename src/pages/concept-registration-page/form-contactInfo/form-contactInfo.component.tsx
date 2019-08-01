import _ from 'lodash';
import { withFormik } from 'formik';

import { schema } from './form-contactInfo.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';
import { FormContactInfoPure } from './form-contactInfo-pure.component';

export interface FormValues {
  kontaktpunkt: {
    harEpost: string;
    harTelefon: string;
  };
}

interface FormProps {
  concept: object;
}

const config = {
  mapPropsToValues: ({ concept }: FormProps) => ({
    kontaktpunkt: _.get(concept, 'kontaktpunkt') || { harEpost: '', harTelefon: '' }
  }),
  validationSchema: schema,
  validate: _.throttle(patchConceptFromForm, 250),
  handleSubmit() {}
};

export const FormContactInfo = withFormik<FormProps, FormValues>(config)(FormContactInfoPure);
