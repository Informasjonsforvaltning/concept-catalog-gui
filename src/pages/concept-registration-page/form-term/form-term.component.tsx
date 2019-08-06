import _ from 'lodash';
import { withFormik } from 'formik';
import { FormTermPure } from './form-term-pure.component';
import { schema } from './form-term.schema';
import { Concept } from '../../../domain/Concept';
import { validateConceptForm } from '../../../lib/validateConceptForm';

interface FormProps {
  concept: Concept;
  dispatch: Function;
}

type FormValues = Pick<Concept, 'anbefaltTerm' | 'definisjon' | 'kildebeskrivelse' | 'merknad'>;

// Remove all empty occurenses of kilde on Egendefinert
const preProcessValues = origValues => {
  // Exit if user is clearing the select box and kilde is null
  const kilder = _.get(origValues, 'kildebeskrivelse.kilde');
  if (!kilder) {
    return origValues;
  }

  // Filter out empty kilder
  const nonEmptyKildes = _.filter(kilder, kilde => !!(kilde.uri || kilde.tekst));

  // Clone the original values but replace kilde with nonEmptyKildes
  const values = _.cloneDeep(origValues);
  values.kildebeskrivelse.kilde = nonEmptyKildes;
  return values;
};

const patchWithPreProcess = (values, { concept, dispatch }) => {
  const processedValues = preProcessValues(values);
  return validateConceptForm(processedValues, schema, concept, dispatch);
};

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
  validate: _.throttle(patchWithPreProcess, 250),
  handleSubmit() {}
};

export const FormTerm = withFormik<FormProps, FormValues>(config)(FormTermPure);
