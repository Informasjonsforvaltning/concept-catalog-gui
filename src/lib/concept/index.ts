import { Concept } from '../../types';
import { ConceptStatus } from '../../types/enums';

export const isConceptEditable = ({
  status,
  erSistPublisert,
  revisjonAvSistPublisert
}: Concept) =>
  (status === ConceptStatus.PUBLISERT && erSistPublisert) ||
  ((status === ConceptStatus.UTKAST ||
    status === ConceptStatus.HOERING ||
    status === ConceptStatus.GODKJENT) &&
    revisjonAvSistPublisert);
