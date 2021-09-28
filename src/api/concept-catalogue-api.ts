import axios from 'axios';

import { Concept } from '../types';

import ImportError from '../domain/ImportError';

import { getConfig } from '../config';

import { authService } from '../services/auth-service';

/* utility functions */

const extractResourseId = response =>
  response?.headers?.location?.split('/').pop();

const extractJsonBody = response => response.data;

/* low level api */
const conceptCatalogueApiRaw = async (method, path, data?) =>
  axios({
    url: `${getConfig().conceptCatalogueApi.host}${path}`,
    method,
    data,
    headers: {
      Authorization: await authService.getAuthorizationHeader()
    }
  });

const conceptCatalogueApiPost = (path, body) =>
  conceptCatalogueApiRaw('POST', path, body).then(extractResourseId);

const conceptCatalogueApiGet = path =>
  conceptCatalogueApiRaw('GET', path).then(extractJsonBody);

const conceptCatalogueApiPatch = (path, body) =>
  conceptCatalogueApiRaw('PATCH', path, body).then(extractJsonBody);

const conceptCatalogueApiDelete = path =>
  conceptCatalogueApiRaw('DELETE', path).then(() => {});

const conceptListPath = '/begreper';

const conceptListImportPath = '/begreper/import';

const conceptPath = (conceptId): string => `${conceptListPath}/${conceptId}`;

/* high level api */

export const getConcept = (catalogId): Promise<Concept> =>
  conceptCatalogueApiGet(conceptPath(catalogId));

export const getConceptsForCatalog = (catalogId): Promise<Concept[]> =>
  conceptCatalogueApiGet(
    `${conceptListPath}?orgNummer=${catalogId}`
  ) as Promise<Concept[]>;

export const postConcept = (body): Promise<void> =>
  conceptCatalogueApiPost(conceptListPath, body);

export const importConcepts = async (
  body: Array<
    Omit<Concept, 'id'>
  >
): Promise<void> => {
  try {
    return await conceptCatalogueApiPost(conceptListImportPath, body);
  } catch (error: any) {
    throw new ImportError(
      error?.response?.data?.message ?? error.message,
      error?.response?.data?.exception
    );
  }
};

export const patchConcept = (conceptId, patch): Promise<Concept> =>
  conceptCatalogueApiPatch(conceptPath(conceptId), patch);

export const deleteConcept = (conceptId: string): Promise<void> =>
  conceptCatalogueApiDelete(conceptPath(conceptId));
