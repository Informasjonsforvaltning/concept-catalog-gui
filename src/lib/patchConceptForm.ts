import _ from 'lodash';
import { compare } from 'fast-json-patch';
import omit from 'lodash/omit';

import { patchConceptById, setIsSaving } from '../features/conceptForm';

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
  { concept, dispatch, lastPatchedResponse, isSaving }
): void => {
  const diff = compare(
    omit(lastPatchedResponse, metaDataFieldsToOmit),
    omit({ ...lastPatchedResponse, ...values }, metaDataFieldsToOmit)
  );
  if (!isSaving && diff.length > 0) {
    const conceptId = _.get(concept, 'id');
    if (!lastPatchedResponse.erPublisert) {
      dispatch(setIsSaving());
      dispatch(
        patchConceptById({
          conceptId,
          diff,
          justChangedStatus: !!values.status
        })
      );
    }
  }
};
