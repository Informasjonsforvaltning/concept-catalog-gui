import { validateYupSchema } from 'formik';
import { setValidationError } from '../features/conceptForm';

export const validateConceptForm = (values, schema, dispatch): void => {
  validateYupSchema(values, schema)
    .then(() => dispatch(setValidationError(false)))
    .catch(() => dispatch(setValidationError(true)));
};
