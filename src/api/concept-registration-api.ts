import {
  registrationApiGet,
  registrationApiPost,
  registrationApiPatch,
  registrationApiDelete
} from './concept-catalogue-api';

export const conceptListPath = (): string => '/begreper';

export const conceptPath = (conceptId): string => `${conceptListPath()}/${conceptId}`;

export const getConcept = (catalogId): Promise<any[]> => registrationApiGet(conceptPath(catalogId));

export const postConcept = (body): Promise<void> => registrationApiPost(conceptListPath(), body);

export const patchConcept = (conceptId, patch): Promise<void> => registrationApiPatch(conceptPath(conceptId), patch);

export const deleteConcept = (conceptId: string): Promise<void> => registrationApiDelete(conceptPath(conceptId));
