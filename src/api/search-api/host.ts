import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  params?: any;
  data?: any;
}

export const searchApi = ({ path, method, params, data }: Props) =>
  axios({
    url: `${getConfig().searchApi.host}${path}`,
    method,
    params,
    data
  })
    .then(response => cleanDeep(response.data))
    .catch(() => null);

export const searchApiPost = (path: string, body: any) =>
  searchApi({ path, method: 'POST', data: body });

export const searchApiGet = (path: string, params: any) =>
  searchApi({ path, method: 'GET', params });
