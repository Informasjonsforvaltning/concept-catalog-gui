import axios from 'axios';
import get from 'lodash/get';
import { getConfig } from '../config';

export const searchApiGet = ({ url, params }) =>
  axios
    .get(url, {
      params,
      headers: { Accept: 'application/json' }
    })
    .then(r => r.data);

export const searchConcepts = params =>
  searchApiGet({
    url: `${getConfig().conceptApi.host}/api/concepts`,
    params
  });

export const extractConcepts = searchResponse => get(searchResponse, ['_embedded', 'concepts'], []);
