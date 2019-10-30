import _ from 'lodash';
import { validateYupSchema } from 'formik';
import { conceptValidationErrorAction } from '../app/reducers/stateReducer';

export const validateConceptForm = (values, schema, concept, dispatch): void => {
  validateYupSchema(values, schema)
    .then(() => dispatch(conceptValidationErrorAction(_.get(concept, 'id'), false)))
    .catch(() => dispatch(conceptValidationErrorAction(_.get(concept, 'id'), true)));
};
