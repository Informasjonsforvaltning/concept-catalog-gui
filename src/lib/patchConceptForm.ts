import { patchConcept } from '../api/concept-registration-api';

export const patchConceptFromForm = (values, { concept }): void => {
  patchConcept(concept.id, values);
};
