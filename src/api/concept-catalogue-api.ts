import axios from 'axios';
import get from 'lodash/get';

import { Concept } from '../domain/Concept';
import { getConfig } from '../config';
import { getToken } from '../auth/auth-service';

export const conceptCatalogueApiRaw = async (method, path, data?) =>
  axios({
    url: `${getConfig().conceptCatalogueApi.host}${path}`,
    method,
    data,
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  });

const extractResourseId = response =>
  get(response, 'headers.location')
    .split('/')
    .pop();

const extractJsonBody = response => response.data;

// TODO: remove this when translatable fields are supported
const normalizeToString = input => (typeof input === 'string' ? input : get(input, 'nb'));

// TODO: remove this when translatable fields are supported
const normalizeConcept = ({ anbefaltTerm, definisjon, ...rest }: Concept) => ({
  anbefaltTerm: normalizeToString(anbefaltTerm),
  definisjon: normalizeToString(definisjon),
  ...rest
});

const normalizeData = (data): Concept | Concept[] =>
  Array.isArray(data) ? data.map(normalizeConcept) : normalizeConcept(data);

export const conceptCatalogueApiPost = (path, body) =>
  conceptCatalogueApiRaw('POST', path, body).then(extractResourseId);

export const conceptCatalogueApiGet = path =>
  conceptCatalogueApiRaw('GET', path)
    .then(extractJsonBody)
    .then(normalizeData);

export const conceptCatalogueApiPatch = (path, body) =>
  conceptCatalogueApiRaw('PATCH', path, body).then(extractJsonBody);

export const conceptCatalogueApiDelete = path => conceptCatalogueApiRaw('DELETE', path).then(() => {});

export const conceptListPath = (): string => '/begreper';

export const conceptPath = (conceptId): string => `${conceptListPath()}/${conceptId}`;

export const getConcept = (catalogId): Promise<Concept[] | Concept> => conceptCatalogueApiGet(conceptPath(catalogId));

export const postConcept = (body): Promise<void> => conceptCatalogueApiPost(conceptListPath(), body);

export const patchConcept = (conceptId, patch): Promise<void> =>
  conceptCatalogueApiPatch(conceptPath(conceptId), patch);

export const deleteConcept = (conceptId: string): Promise<void> => conceptCatalogueApiDelete(conceptPath(conceptId));
