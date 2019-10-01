import axios from 'axios';
import { getConfig } from '../config';
import { getToken } from '../auth/auth-service';
import get from 'lodash/get';
import { Concept } from '../domain/Concept';

export const conceptCatalogueApiRaw = async (method, path, data?) =>
  axios({
    url: `${getConfig().conceptRegistrationApi.host}${path}`,
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
