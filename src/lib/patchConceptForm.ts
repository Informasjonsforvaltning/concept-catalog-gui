import _ from 'lodash';
import { compare } from 'fast-json-patch';
import { patchConcept } from '../api/concept-registration-api';
import {
  conceptPatchSuccessAction,
  conceptPatchErrorAction,
  conceptPatchIsSavingAction
} from '../components/status-bar/reducers/statusBarReducer';

export const patchConceptFromForm = (values, { concept, dispatch }): void => {
  const diff = compare({}, values);
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
