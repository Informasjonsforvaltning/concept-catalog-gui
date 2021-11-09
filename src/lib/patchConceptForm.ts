import _ from 'lodash';
import { compare } from 'fast-json-patch';
import omit from 'lodash/omit';

import { ConceptStatus } from '../types/enums';
import { patchConcept } from '../api/concept-catalogue-api';
import {
  conceptPatchSuccessAction,
  conceptPatchErrorAction,
  conceptPatchIsSavingAction
} from '../app/reducers/stateReducer';

export const patchConceptFromForm = (
  values,
  { concept, dispatch, lastPatchedResponse = {}, isSaving }
): void => {
  const diff = compare(
    omit(lastPatchedResponse, [
      'endringslogelement',
      'ansvarligVirksomhet',
      'status',
      'revisjonAvSistPublisert',
      'erSistPublisert',
      'versjonsnr',
      'originaltBegrep',
      'id'
    ]),
    values
  );
  if (!isSaving && diff.length > 0) {
    const conceptId = _.get(concept, 'id');
    if (concept.status === ConceptStatus.UTKAST) {
      dispatch(conceptPatchIsSavingAction(conceptId));
      patchConcept(conceptId, diff)
        .then(response => {
          dispatch(
            conceptPatchSuccessAction(conceptId, !!values.status, response)
          );
        })
        .catch(error => {
          dispatch(conceptPatchErrorAction(conceptId, error));
        });
    }
  }
};
