import { registrationApiGet, registrationApiPost, registrationApiPatch } from './concept-catalogue-api';

export const conceptListPath = (): string => 'begreper/';

export const conceptPath = (conceptId): string => `${conceptListPath()}${conceptId}`;

export const getConcept = (catalogId): Promise<void> => registrationApiGet(conceptPath(catalogId));

export const postConcept = (catalogId, body): Promise<void> => registrationApiPost(conceptPath(catalogId), body);

export const patchConcept = (conceptId, patch): Promise<void> => registrationApiPatch(conceptPath(conceptId), patch);
