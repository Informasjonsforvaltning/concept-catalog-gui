import axios from 'axios';
import { getConfig } from '../config';

export const conceptCatalogueApi = (method, path, data?) =>
  axios({
    url: `${getConfig().conceptRegistrationApi.host}${path}`,
    method,
    data
    // todo very soon
    // headers: {
    //   Authorization: `Bearer ${await getToken()}`
    // }
  }).then(r => r.data);

export const conceptCatalogueApiPost = (path, body) => conceptCatalogueApi('POST', path, body);

export const conceptCatalogueApiGet = path => conceptCatalogueApi('GET', path);

export const conceptCatalogueApiPatch = (path, body) => conceptCatalogueApi('PATCH', path, body);

export const conceptCatalogueApiDelete = path => conceptCatalogueApi('DELETE', path);
