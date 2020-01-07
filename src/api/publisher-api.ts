import axios from 'axios';
import { getConfig } from '../config';

export const publisherApiGet = path =>
  axios
    .get(`${getConfig().organizationApi.host}${path}`, {
      headers: { accept: 'application/json' }
    })
    .then(r => r.data);
