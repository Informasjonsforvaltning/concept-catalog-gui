import _ from 'lodash';
import { compare } from 'fast-json-patch';
import omit from 'lodash/omit';
import { patchConcept } from '../api/concept-catalogue-api';
import {
  conceptPatchSuccessAction,
  conceptPatchErrorAction,
  conceptPatchIsSavingAction
} from '../app/reducers/stateReducer';

export const patchConceptFromForm = (values, { concept, dispatch, lastPatchedValues = {} }): void => {
  const diff = compare(
    omit(lastPatchedValues, 'endringslogelement'),
    omit({ ...lastPatchedValues, ...values }, 'endringslogelement')
  );
  const conceptId = _.get(concept, 'id');
  dispatch(conceptPatchIsSavingAction(conceptId));
  patchConcept(conceptId, diff)
    .then(response => {
      dispatch(conceptPatchSuccessAction(conceptId, values, response));
    })
    .catch(error => {
      dispatch(conceptPatchErrorAction(conceptId, error));
    });
};
