import {
  conceptCatalogueApiGet,
  conceptCatalogueApiPost,
  conceptCatalogueApiPatch,
  conceptCatalogueApiDelete
} from './concept-catalogue-api';

export const conceptListPath = (): string => '/begreper';

export const conceptPath = (conceptId): string => `${conceptListPath()}/${conceptId}`;

export const getConcept = (catalogId): Promise<any[]> => conceptCatalogueApiGet(conceptPath(catalogId));

export const postConcept = (body): Promise<void> => conceptCatalogueApiPost(conceptListPath(), body);

export const patchConcept = (conceptId, patch): Promise<void> =>
  conceptCatalogueApiPatch(conceptPath(conceptId), patch);

export const deleteConcept = (conceptId: string): Promise<void> => conceptCatalogueApiDelete(conceptPath(conceptId));
