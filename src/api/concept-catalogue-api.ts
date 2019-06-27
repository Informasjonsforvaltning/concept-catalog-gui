import url from 'url';

const conceptCatalogueApiConfig = {
  host: ''
};

export const configureRegistrationApi = newRegistrationApiConfig =>
  Object.assign(conceptCatalogueApiConfig, newRegistrationApiConfig);

const getRootUrl = () => conceptCatalogueApiConfig.host;
const resolveUrl = path => url.resolve(getRootUrl(), path);

const validateResponse = response => {
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const registrationApi = (method, path, jsonBody?) => {
  const headers = { Accept: 'application/json' }; // required for cors
  if (jsonBody) {
    Object.assign(headers, { 'Content-Type': 'application/json' });
  }
  const body = jsonBody && JSON.stringify(jsonBody);
  return fetch(resolveUrl(path), { method, headers, body }).then(validateResponse);
};

export const registrationApiGet = path => registrationApi('GET', path);

export const registrationApiPatch = (path, body) => registrationApi('PATCH', path, body);
