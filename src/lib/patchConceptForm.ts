import _ from 'lodash';
import { compare } from 'fast-json-patch';

import {
  patchConceptById,
  postNewConcept,
  setIsSaving
} from '../features/conceptForm';

const metaDataFieldsToOmit = [
  'endringslogelement',
  'ansvarligVirksomhet',
  'revisjonAvSistPublisert',
  'erSistPublisert',
  'originaltBegrep',
  'id',
  'revisjonAv'
];

export const postConceptFromForm = (
  values,
  { concept, dispatch, isSaving }
): void => {
  if (!isSaving && values) {
    dispatch(setIsSaving());
    dispatch(
      postNewConcept({
        concept: { ...concept, ...values }
      })
    );
  }
};

export const patchConceptFromForm = (
  values,
  { concept, dispatch, lastPatchedResponse, isSaving }
): void => {
  const diff = compare(
    _(lastPatchedResponse).omit(metaDataFieldsToOmit).omitBy(_.isNull).value(),
    _({
      ...lastPatchedResponse,
      ...values,
      ...{
        // Empty fagområde if fagområdeKoder has values
        fagområde: _.isEmpty(values.fagområdeKoder) ? values.fagområde : null
      }
    })
      .omit(metaDataFieldsToOmit)
      .omitBy(_.isNull)
      .value()
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
