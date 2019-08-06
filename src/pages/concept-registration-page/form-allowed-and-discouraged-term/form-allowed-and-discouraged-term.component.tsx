import _ from 'lodash';
import { withFormik } from 'formik';

import { schema } from './form-allowed-and-discouraged-term.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';
import { FormAllowedAndDiscouragedPure } from './form-allowed-and-discouraged-term-pure.component';
import { Concept } from '../../../domain/Concept';
import { validateConceptForm } from '../../../lib/validateConceptForm';

interface FormProps {
  concept: Concept;
  dispatch: Function;
}

type FormValues = Pick<Concept, 'tillattTerm' | 'frarådetTerm'>;

const config = {
  mapPropsToValues: ({ concept: { tillattTerm = [], frarådetTerm = [] } }: FormProps) => ({
    tillattTerm,
    frarådetTerm
  }),
  validationSchema: schema,
  validate: _.throttle((values, { concept, dispatch }) => {
    validateConceptForm(values, schema, concept, dispatch);
  }, 250),
  handleSubmit() {}
};

export const FormAllowedAndDiscouraged = withFormik<FormProps, FormValues>(config)(FormAllowedAndDiscouragedPure);
