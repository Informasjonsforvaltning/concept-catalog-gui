import { patchConceptFromForm } from '../../../../lib/patchConceptForm';
import { validateConceptForm } from '../../../../lib/validateConceptForm';
import { postConceptRevision } from '../../../../api/concept-catalog-api';

import { schema } from '../form-concept.schema';

const stringsToArray = ({ nb, nn, en }) => ({
  ...(nb && { nb: Array.isArray(nb) ? nb : [nb] }),
  ...(nn && { nn: Array.isArray(nn) ? nn : [nn] }),
  ...(en && { en: Array.isArray(en) ? en : [en] })
});

const pruneEmptyProperties = (obj: any, reduceAsArray = false) => {
  if (!obj) {
    return null;
  }
  const filteredKeys = Object.keys(obj).filter(
    key => obj[key] != null && obj[key] !== '' && obj[key] !== []
  );

  return reduceAsArray
    ? filteredKeys.reduce((acc, key) => {
        if (typeof obj[key] === 'object') {
          const prunedObject = pruneEmptyProperties(obj[key]);
          return Object.keys(prunedObject).length === 0
            ? acc
            : [...acc, prunedObject];
        }
        return [...acc, obj[key]];
      }, [] as any[])
    : filteredKeys.reduce((acc, key) => {
        if (typeof obj[key] === 'object') {
          const isArray = Array.isArray(obj[key]);
          const prunedObject = pruneEmptyProperties(obj[key], isArray);
          return Object.keys(prunedObject).length === 0
            ? acc
            : { ...acc, [key]: prunedObject };
        }
        return { ...acc, [key]: obj[key] };
      }, {});
};

const preProcessValues = ({
  kildebeskrivelse,
  merknad,
  eksempel,
  bruksområde,
  omfang,
  kontaktpunkt,
  ...conceptValues
}) => ({
  ...conceptValues,
  kildebeskrivelse: pruneEmptyProperties(kildebeskrivelse),
  merknad: stringsToArray(merknad),
  eksempel: stringsToArray(eksempel),
  bruksområde: stringsToArray(bruksområde),
  omfang: pruneEmptyProperties(omfang),
  kontaktpunkt: pruneEmptyProperties(kontaktpunkt)
});

export const patchWithPreProcess = (
  values,
  { concept, dispatch, lastPatchedResponse, isSaving }
) => {
  const processedValues = preProcessValues(values);
  patchConceptFromForm(processedValues, {
    concept,
    dispatch,
    lastPatchedResponse,
    isSaving
  });
};

// new export const with validation of concept
export const patchWithPreProcessAndValidation = (values, { dispatch }) => {
  const processedValues = preProcessValues(values);
  validateConceptForm(processedValues, schema, dispatch);
};

export const postWithPreProcess = async (id: string, values): Promise<void> => {
  const processedValues = preProcessValues(values);
  return postConceptRevision(id, processedValues);
};
