import { Concept } from '../../types';

export const isConceptEditable = (concept: Concept | undefined) => {
  if (!concept) {
    return false;
  }
  const { erPublisert, erSistPublisert, revisjonAvSistPublisert } = concept;
  return (erPublisert && erSistPublisert) || revisjonAvSistPublisert;
};
