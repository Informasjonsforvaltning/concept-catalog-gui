import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  params?: any;
  data?: any;
}

export const searchFullTextApi = ({ path, method, params, data }: Props) =>
  axios({
    url: `${getConfig().searchFullTextApi.host}${path}`,
    method,
    params,
    data
  })
    .then(response => cleanDeep(response.data))
    .catch(() => null);

export const searchFullTextApiPost = (path: string, body: any) =>
  searchFullTextApi({ path, method: 'POST', data: body });

export const searchFullTextApiGet = (path: string, params: any) => searchFullTextApi({ path, method: 'GET', params });
