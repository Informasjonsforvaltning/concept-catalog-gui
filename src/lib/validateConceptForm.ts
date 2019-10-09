import _ from 'lodash';
import { validateYupSchema } from 'formik';
import { conceptValidationErrorAction, stateReducer } from '../app/reducers/stateReducer';
import { patchConceptFromForm } from './patchConceptForm';

export const validateConceptForm = (values, schema, concept, dispatch): void => {
  validateYupSchema(values, schema)
    .then(() => dispatch(conceptValidationErrorAction(_.get(concept, 'id'), false)))
    .catch(() => dispatch(conceptValidationErrorAction(_.get(concept, 'id'), true)));
  patchConceptFromForm(values, { concept: concept, dispatch: dispatch });
};
