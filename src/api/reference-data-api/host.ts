import axios from 'axios';

import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  params?: any;
  data?: any;
}

export const referenceDataApi = async ({ path, method, params, data }: Props) =>
  axios({
    url: `${getConfig().referenceDataApi.host}/reference-data/${path}`,
    method,
    params,
    data
  }).then(response => response.data);
