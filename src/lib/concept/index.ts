import { Concept } from '../../types';
import { ConceptStatus } from '../../types/enums';

export const isConceptEditable = (concept: Concept | undefined) => {
  if (!concept) {
    return false;
  }
  const { status, erPublisert, erSistPublisert, revisjonAvSistPublisert } =
    concept;
  return (
    (erPublisert && erSistPublisert) ||
    ((status === ConceptStatus.UTKAST ||
      status === ConceptStatus.HOERING ||
      status === ConceptStatus.GODKJENT) &&
      revisjonAvSistPublisert)
  );
};
