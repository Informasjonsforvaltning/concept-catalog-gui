import {
  postConcept,
  postConceptRevision
} from '../../../../api/concept-catalog-api';

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

export const preProcessValues = (
  orgId: string,
  {
    ansvarligVirksomhet,
    merknad,
    eksempel,
    fagområde,
    omfang,
    kontaktpunkt,
    ...conceptValues
  }
) => ({
  ...conceptValues,
  merknad,
  eksempel,
  fagområde: fagområde ? stringsToArray(fagområde) : null,
  omfang: pruneEmptyProperties(omfang),
  kontaktpunkt: pruneEmptyProperties(kontaktpunkt),
  ansvarligVirksomhet: ansvarligVirksomhet || { id: orgId }
});

export const postConceptWithPreProcess = async (
  publisherId: string,
  values
): Promise<string> => {
  const processedValues = preProcessValues(publisherId, values);
  return postConcept(processedValues);
};

export const postConceptRevisionWithPreProcess = async (
  id: string,
  publisherId: string,
  values
): Promise<void> => {
  const processedValues = preProcessValues(publisherId, values);
  return postConceptRevision(id, processedValues);
};
