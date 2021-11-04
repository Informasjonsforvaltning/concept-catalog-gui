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

const metaDataFieldsToOmit = [
  'endringslogelement',
  'ansvarligVirksomhet',
  'revisjonAvSistPublisert',
  'erSistPublisert',
  'originaltBegrep',
  'id',
  'revisjonAv'
];

export const patchConceptFromForm = (
  values,
  { concept, dispatch, lastPatchedResponse = {}, isSaving }
): void => {
  const diff = compare(
    omit(lastPatchedResponse, metaDataFieldsToOmit),
    omit({ ...lastPatchedResponse, ...values }, metaDataFieldsToOmit)
  );
  if (!isSaving && diff.length > 0) {
    const conceptId = _.get(concept, 'id');
    if (
      concept.status === ConceptStatus.UTKAST ||
      concept.status === ConceptStatus.HOERING ||
      concept.status === ConceptStatus.GODKJENT
    ) {
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
