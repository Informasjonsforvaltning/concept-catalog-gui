import axios from 'axios';

import { getConfig } from '../../config';
import { authService } from '../../services/auth-service';

interface Props {
  path: string;
  method: any;
  params?: any;
  data?: any;
}

export const commentsApi = async ({ path, method, params, data }: Props) =>
  axios({
    url: `${getConfig().commentsApi.host}/${path}`,
    method,
    params,
    data,
    headers: {
      Authorization: await authService.getAuthorizationHeader()
    }
  }).then(r => r.data);

export const commentsByTopicIdApiGet = (orgNumber: string, topicId: string) =>
  commentsApi({
    path: `${orgNumber}/${topicId}/comment`,
    method: 'GET',
    data: topicId
  });

export const updateCommentByIdPut = (
  orgNumber: string,
  topicId: string,
  commentId: string,
  body: any
) =>
  commentsApi({
    path: `${orgNumber}/${topicId}/comment/${commentId}`,
    method: 'PUT',
    data: body
  });

export const createCommentPost = (
  orgNumber: string,
  topicId: string,
  body: any
) =>
  commentsApi({
    path: `${orgNumber}/${topicId}/comment`,
    method: 'POST',
    data: body
  });

export const deleteCommentById = (
  orgNumber: string,
  topicId: string,
  commentId: string
) =>
  commentsApi({
    path: `${orgNumber}/${topicId}/comment/${commentId}`,
    method: 'DELETE'
  });
