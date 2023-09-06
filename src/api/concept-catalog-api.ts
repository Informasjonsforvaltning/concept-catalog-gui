import axios from 'axios';
import { Collection, Concept } from '../types';

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

export const getRevisions = (conceptId): Promise<Concept[]> =>
  conceptCatalogApiGet(revisionsPath(conceptId));

export const postConcept = (body): Promise<string> =>
  conceptCatalogApiPost(conceptListPath, body);

export const postConceptRevision = (id: string, body): Promise<void> =>
  conceptCatalogApiPost(conceptRevisionPath(id), body);

export const publishConcept = (id: string): Promise<Concept> =>
  conceptCatalogApiPublish(conceptPublishPath(id));

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
