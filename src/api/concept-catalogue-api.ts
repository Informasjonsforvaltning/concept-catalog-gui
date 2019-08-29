import url from 'url';
import { getConfig } from '../config';

const getRootUrl = () => getConfig().conceptRegistrationApi.host;
const resolveUrl = path => url.resolve(getRootUrl(), path);

const validateResponse = (method, response) => {
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }

  return response.json().catch(() => response);
};

export const registrationApi = (method, path, jsonBody?) => {
  const headers = { Accept: 'application/json' }; // required for cors
  if (jsonBody) {
    Object.assign(headers, { 'Content-Type': 'application/json' });
  }
  const body = jsonBody && JSON.stringify(jsonBody);

  return fetch(resolveUrl(path), { method, body }).then(response => {
    return validateResponse(method, response);
  });
};

export const registrationApiPost = (path, body) => registrationApi('POST', path, body);

export const registrationApiGet = path => registrationApi('GET', path);

export const registrationApiPatch = (path, body) => registrationApi('PATCH', path, body);

export const registrationApiDelete = path => registrationApi('DELETE', path);
