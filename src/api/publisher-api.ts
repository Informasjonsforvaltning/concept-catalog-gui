import axios from 'axios';
import { getConfig } from '../config';

export const publisherApiGet = path =>
  axios
    .get(`${getConfig().publisherApi.host}${path}`, {
      headers: { authorization: getConfig().publisherApi.authorization }
    })
    .then(r => r.data);
