import { Concept } from '../../types';

export const isConceptEditable = (concept: Concept | undefined) => {
  if (concept == null) {
    return false;
  }
  const { id, erPublisert, erSistPublisert, revisjonAvSistPublisert } = concept;
  const editable =
    id == null || (erPublisert && erSistPublisert) || revisjonAvSistPublisert;

  return editable;
};
