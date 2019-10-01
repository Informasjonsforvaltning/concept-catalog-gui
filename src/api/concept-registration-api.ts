import {
  conceptCatalogueApiGet,
  conceptCatalogueApiPost,
  conceptCatalogueApiPatch,
  conceptCatalogueApiDelete
} from './concept-catalogue-api';
import { Concept } from '../domain/Concept';

export const conceptListPath = (): string => '/begreper';

export const conceptPath = (conceptId): string => `${conceptListPath()}/${conceptId}`;

export const getConcept = (catalogId): Promise<Concept[] | Concept> => conceptCatalogueApiGet(conceptPath(catalogId));

export const postConcept = (body): Promise<void> => conceptCatalogueApiPost(conceptListPath(), body);

export const patchConcept = (conceptId, patch): Promise<void> =>
  conceptCatalogueApiPatch(conceptPath(conceptId), patch);

export const deleteConcept = (conceptId: string): Promise<void> => conceptCatalogueApiDelete(conceptPath(conceptId));
