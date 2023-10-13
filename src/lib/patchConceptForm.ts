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

const clearValues = (object: any, path: string) => {
  const fields = path.split('.');
  const currentField = fields.shift();

  if (object && currentField) {
    if (currentField.endsWith('[]')) {
      const value = _.get(object, currentField.replace('[]', ''));
      if (_.isArray(value)) {
        _.forEach(value, item => {
          clearValues(item, fields.join('.'));
        });
      }
    } else if (fields.length > 0) {
      clearValues(object[currentField], fields.join('.'));
    } else {
      const value = _.get(object, currentField);
      if (value !== undefined && _.isEmpty(value)) {
        _.set(object, currentField, null);
      }
    }
  }
};

export const patchConceptFromForm = (
  values,
  { concept, dispatch, lastPatchedResponse, isSaving }
): void => {
  [
    'definisjon.kildebeskrivelse.kilde[].uri',
    'definisjonForAllmennheten.kildebeskrivelse.kilde[].uri',
    'definisjonForSpesialister.kildebeskrivelse.kilde[].uri',
    'fagområdeKoder',
    'gyldigFom',
    'gyldigTom',
    'kontaktpunkt.harEpost',
    'kontaktpunkt.harTelefon',
    'omfang.uri'
  ].forEach(field => {
    clearValues(values, field);
  });

  const diff = compare(
    _(lastPatchedResponse).omit(metaDataFieldsToOmit).omitBy(_.isNull).value(),
    _({
      ...lastPatchedResponse,
      ...values
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
