import axios from 'axios';
import { getConfig } from '../config';

export const registrationApi = (method, path, data?) =>
  axios({
    url: `${getConfig().conceptRegistrationApi.host}${path}`,
    method,
    data
    // todo very soon
    // headers: {
    //   Authorization: `Bearer ${await getToken()}`
    // }
  }).then(r => r.data);

export const registrationApiPost = (path, body) => registrationApi('POST', path, body);

export const registrationApiGet = path => registrationApi('GET', path);

export const registrationApiPatch = (path, body) => registrationApi('PATCH', path, body);

export const registrationApiDelete = path => registrationApi('DELETE', path);
