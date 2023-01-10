import axios from 'axios';

import { Collection, Concept, SearchOperation } from '../types';

import ImportError from '../domain/ImportError';

import { getConfig } from '../config';

import { authService } from '../services/auth-service';

/* utility functions */

const extractResourseId = response =>
  response?.headers?.location?.split('/').pop();

const extractJsonBody = response => response.data;

/* low level api */
const conceptCatalogApiRaw = async (method, path, data?) =>
  axios({
    url: `${getConfig().conceptCatalogApi.host}${path}`,
    method,
    data,
    headers: {
      Authorization: await authService.getAuthorizationHeader()
    }
  });

const conceptCatalogApiPost = (path, body) =>
  conceptCatalogApiRaw('POST', path, body).then(extractResourseId);

const conceptCatalogApiGet = path =>
  conceptCatalogApiRaw('GET', path).then(extractJsonBody);

const conceptCatalogApiPatch = (path, body) =>
  conceptCatalogApiRaw('PATCH', path, body).then(extractJsonBody);

const conceptCatalogApiDelete = path =>
  conceptCatalogApiRaw('DELETE', path).then(() => {});

const conceptListPath = '/begreper';

const conceptListImportPath = '/begreper/import';

const conceptRevisionPath = (id: string) => `/begreper/${id}/revisjon`;

const conceptPath = (conceptId): string => `${conceptListPath}/${conceptId}`;

const collectionsPath = '/begrepssamlinger';

const conceptSearchPath = '/begreper/search';

/* high level api */

export const getCollections = (): Promise<Collection[]> =>
  conceptCatalogApiGet(collectionsPath);

export const getConcept = (catalogId): Promise<Concept> =>
  conceptCatalogApiGet(conceptPath(catalogId));

export const getConceptsForCatalog = (catalogId): Promise<Concept[]> =>
  conceptCatalogApiGet(`${conceptListPath}?orgNummer=${catalogId}`) as Promise<
    Concept[]
  >;

export const searchConceptsForCatalog = (
  catalogId,
  searchOperation: SearchOperation
): Promise<Concept[]> =>
  conceptCatalogApiRaw(
    'POST',
    `${conceptSearchPath}?orgNummer=${catalogId}`,
    searchOperation
  ).then(extractJsonBody) as Promise<Concept[]>;

export const postConcept = (body): Promise<void> =>
  conceptCatalogApiPost(conceptListPath, body);

export const postConceptRevision = (id: string, body): Promise<void> =>
  conceptCatalogApiPost(conceptRevisionPath(id), body);

export const importConcepts = async (
  body: Array<Omit<Concept, 'id'>>
): Promise<void> => {
  try {
    return await conceptCatalogApiPost(conceptListImportPath, body);
  } catch (error: any) {
    throw new ImportError(
      error?.response?.data?.message ?? error.message,
      error?.response?.data?.exception
    );
  }
};

export const patchConcept = (conceptId, patch): Promise<Concept> =>
  conceptCatalogApiPatch(conceptPath(conceptId), patch);

export const deleteConcept = (conceptId: string): Promise<void> =>
  conceptCatalogApiDelete(conceptPath(conceptId));
