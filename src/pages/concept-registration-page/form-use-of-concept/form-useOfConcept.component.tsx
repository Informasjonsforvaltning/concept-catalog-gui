import _ from 'lodash';
import { withFormik } from 'formik';

import { FormUseOfTermPure } from './form-useOfConcept-pure.component';
import { schema } from './form-useOfConcept.schema';
import { patchConceptFromForm } from '../../../lib/patchConceptForm';

interface Bruksomraade {
  [index: number]: string;
}

export interface FormValues {
  eksempel: string;
  fagområde: string;
  bruksområde: Bruksomraade;
  omfang: {
    tekst: string;
    uri: string;
  };
}

interface FormProps {
  concept: object;
}

const config = {
  mapPropsToValues: ({ concept }: FormProps) => ({
    eksempel: _.get(concept, 'eksempel') || '',
    fagområde: _.get(concept, 'fagområde') || '',
    bruksområde: _.get(concept, 'bruksområde') || '',
    omfang: _.get(concept, 'omfang') || { tekst: '', uri: '' }
  }),
  validationSchema: schema,
  validate: _.throttle(patchConceptFromForm, 250),
  handleSubmit() {}
};

export const FormUseOfTerm = withFormik<FormProps, FormValues>(config)(FormUseOfTermPure);
