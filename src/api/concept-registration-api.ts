import { registrationApiGet, registrationApiPatch } from './concept-catalogue-api';

export const conceptListPath = (): string => 'begreper/';

export const conceptPath = (conceptId): string => `${conceptListPath()}${conceptId}`;

export const getConcept = (catalogId): Promise<void> => registrationApiGet(conceptPath(catalogId));

export const patchConcept = (conceptId, patch): Promise<void> => registrationApiPatch(conceptPath(conceptId), patch);
