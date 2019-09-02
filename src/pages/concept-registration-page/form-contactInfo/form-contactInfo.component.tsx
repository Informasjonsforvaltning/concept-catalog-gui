import _ from 'lodash';
import { withFormik } from 'formik';

import { schema } from './form-contactInfo.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';
import { FormContactInfoPure } from './form-contactInfo-pure.component';
import { Concept } from '../../../domain/Concept';

interface FormProps {
  concept: Concept;
  dispatch: Function;
}

type FormValues = Pick<Concept, 'kontaktpunkt'>;

const config = {
  mapPropsToValues: ({ concept: { kontaktpunkt = null } }: FormProps) => ({
    kontaktpunkt
  }),
  validationSchema: schema,
  validate: _.throttle(patchConceptFromForm, 250),
  handleSubmit() {}
};

export const FormContactInfo = withFormik<FormProps, FormValues>(config)(FormContactInfoPure);
