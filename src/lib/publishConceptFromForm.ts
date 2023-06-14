import _ from 'lodash';

import { publishConceptById, setIsSaving } from '../features/conceptForm';

export const publishConceptFromForm = ({
  concept,
  dispatch,
  lastPatchedResponse,
  isSaving
}): void => {
  if (!isSaving) {
    const conceptId = _.get(concept, 'id');
    if (!lastPatchedResponse.erPublisert) {
      dispatch(setIsSaving());
      dispatch(publishConceptById(conceptId));
    }
  }
};
