import url from 'url';
import { getConfig } from '../config';

const getRootUrl = () => getConfig().publisherApi.host;
const resolveUrl = path => url.resolve(getRootUrl(), path);

const validateResponse = response => {
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const publisherApi = (method, path, jsonBody?) => {
  const headers = { Accept: 'application/json' }; // required for cors
  if (jsonBody) {
    Object.assign(headers, { 'Content-Type': 'application/json' });
  }

  const body = jsonBody && JSON.stringify(jsonBody);
  return fetch(resolveUrl(path), {
    method,
    headers: { authorization: getConfig().publisherApi.authorization },
    body
  }).then(validateResponse);
};

export const publisherApiGet = path => publisherApi('GET', path);
