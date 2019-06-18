import url from 'url';

const publisherApiConfig = {
  host: ''
};

export const configurePublisherApi = newRegistrationApiConfig =>
  Object.assign(publisherApiConfig, newRegistrationApiConfig);

const getRootUrl = () => publisherApiConfig.host;
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
  return fetch(resolveUrl(path), { method, headers, body }).then(validateResponse);
};

export const publisherApiGet = path => publisherApi('GET', path);
