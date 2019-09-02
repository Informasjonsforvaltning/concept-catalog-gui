import _ from 'lodash';
import { withFormik } from 'formik';
import { FormTermPure } from './form-term-pure.component';
import { schema } from './form-term.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';
import { Concept } from '../../../domain/Concept';

interface FormProps {
  concept: Concept;
  dispatch: Function;
}

type FormValues = Pick<Concept, 'anbefaltTerm' | 'definisjon' | 'kildebeskrivelse' | 'merknad'>;

const config = {
  mapPropsToValues: ({
    concept: { anbefaltTerm = '', definisjon = '', kildebeskrivelse = null, merknad = '' }
  }: FormProps) => ({
    anbefaltTerm,
    definisjon,
    kildebeskrivelse,
    merknad
  }),
  validationSchema: schema,
  validate: _.throttle(patchConceptFromForm, 250),
  handleSubmit() {}
};

export const FormTerm = withFormik<FormProps, FormValues>(config)(FormTermPure);
