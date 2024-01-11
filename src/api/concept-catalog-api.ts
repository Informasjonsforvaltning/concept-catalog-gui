import axios from 'axios';
import { Collection, Concept, SearchResult } from '../types';

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

const createConceptCatalogApiPost = (path, body) =>
  conceptCatalogApiRaw('POST', path, body).then(extractResourseId);

const conceptCatalogApiPost = (path, body) =>
  conceptCatalogApiRaw('POST', path, body).then(extractJsonBody);

const conceptCatalogApiPublish = path =>
  conceptCatalogApiRaw('POST', path).then(extractJsonBody);

const conceptCatalogApiGet = path =>
  conceptCatalogApiRaw('GET', path).then(extractJsonBody);

const conceptCatalogApiPatch = (path, body) =>
  conceptCatalogApiRaw('PATCH', path, body).then(extractJsonBody);

const conceptCatalogApiDelete = path =>
  conceptCatalogApiRaw('DELETE', path).then(() => {});

const conceptListPath = '/begreper';

const conceptListImportPath = '/begreper/import';

const conceptRevisionPath = (id: string) => `/begreper/${id}/revisjon`;

const conceptPublishPath = (id: string) => `/begreper/${id}/publish`;

const conceptPath = (conceptId): string => `${conceptListPath}/${conceptId}`;

const revisionsPath = (conceptId): string =>
  `${conceptPath(conceptId)}/revisions`;

const collectionsPath = '/begrepssamlinger';

/* high level api */

export const getCollections = (): Promise<Collection[]> =>
  conceptCatalogApiGet(collectionsPath);

export const getConcept = (conceptId): Promise<Concept> =>
  conceptCatalogApiGet(conceptPath(conceptId));

export const getConceptsForCatalog = (catalogId): Promise<Concept[]> =>
  conceptCatalogApiGet(`${conceptListPath}?orgNummer=${catalogId}`) as Promise<
    Concept[]
  >;

export const getInternalConceptSuggestions = (
  catalogId: string,
  query: string
): Promise<Concept[]> =>
  conceptCatalogApiGet(
    `${conceptListPath}/suggestions?org=${catalogId}&q=${query}&published=false`
  ) as Promise<Concept[]>;

export const searchInternalConcepts = (
  catalogId: string,
  body: string[]
): Promise<SearchResult> =>
  conceptCatalogApiPost(`${conceptListPath}/search?orgNummer=${catalogId}`, {
    filters: {
      originalId: { value: body }
    },
    pagination: {
      size: body.length
    }
  }) as Promise<SearchResult>;

export const getRevisions = (conceptId): Promise<Concept[]> =>
  conceptCatalogApiGet(revisionsPath(conceptId));

export const postConcept = (body): Promise<string> =>
  createConceptCatalogApiPost(conceptListPath, body);

export const postConceptRevision = (id: string, body): Promise<void> =>
  createConceptCatalogApiPost(conceptRevisionPath(id), body);

export const publishConcept = (id: string): Promise<Concept> =>
  conceptCatalogApiPublish(conceptPublishPath(id));

export const importConcepts = async (
  body: Array<Omit<Concept, 'id'>>
): Promise<void> => {
  try {
    return await createConceptCatalogApiPost(conceptListImportPath, body);
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
