import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  params: any;
}

export const searchFullTextApi = ({ path, method, params }: Props) =>
  axios({
    url: `${getConfig().searchFullTextApi.host}${path}`,
    method,
    params
  })
    .then(response => cleanDeep(response.data))
    .catch(() => null);

export const searchFullTextApiGet = (path: string, params: any) => searchFullTextApi({ path, method: 'GET', params });
