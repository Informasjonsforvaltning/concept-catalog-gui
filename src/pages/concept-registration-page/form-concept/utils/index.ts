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
    key =>
      obj[key] != null &&
      obj[key] !== '' &&
      (Array.isArray(obj[key]) ? obj[key].length !== 0 : false)
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
  merknad,
  eksempel,
  fagområde,
  omfang,
  kontaktpunkt,
  ...conceptValues
}) => ({
  ...conceptValues,
  merknad: merknad ? stringsToArray(merknad) : null,
  eksempel: eksempel ? stringsToArray(eksempel) : null,
  fagområde: fagområde ? stringsToArray(fagområde) : null,
  omfang: pruneEmptyProperties(omfang),
  kontaktpunkt: pruneEmptyProperties(kontaktpunkt)
});

export const validateWithPreProcess = (values, { dispatch }) => {
  const processedValues = preProcessValues(values);
  return validateConceptForm(processedValues, schema, dispatch);
};

export const postWithPreProcess = async (id: string, values): Promise<void> => {
  const processedValues = preProcessValues(values);
  return postConceptRevision(id, processedValues);
};
