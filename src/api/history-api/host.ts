import axios from 'axios';
import { getConfig } from '../../config';
import { authService } from '../../services/auth-service';

interface Props {
  path: string;
  method: any;
  params?: any;
  data?: any;
}

export const updateApi = async ({ path, method, params, data }: Props) =>
  axios({
    url: `${getConfig().updateApi.host}/${path}`,
    method,
    params,
    data,
    headers: {
      Authorization: await authService.getAuthorizationHeader()
    }
  }).then(r => r.data);

export const updateByConceptId = (conceptId: string) =>
  updateApi({
    path: `concepts/${conceptId}/updates`,
    method: 'GET'
  });

export const updateByConceptIdAndResourceId = (
  conceptId: string,
  resourceId: string
) =>
  updateApi({
    path: `concepts/${conceptId}/updates/${resourceId}`,
    method: 'GET'
  });

export const createUpdateByConceptId = (conceptId: string, body: any) =>
  updateApi({
    path: `concepts/${conceptId}/updates`,
    method: 'POST',
    data: body
  });
