import {Concept} from '../../types';

export const isConceptEditable = (concept: Concept | undefined) => {
  if (concept == null) {
    return false;
  }
  const { id, erPublisert } = concept;
  return id == null || !erPublisert;
};
