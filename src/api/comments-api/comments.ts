import {
  createCommentPost,
  commentsByTopicIdApiGet,
  updateCommentByIdPut,
  deleteCommentById
} from './host';

export const getCommentsByTopicId = (orgNumber: string, topicId: string) =>
  commentsByTopicIdApiGet(orgNumber, topicId);

export const createComment = (orgNumber: string, topicId: string, body: any) =>
  createCommentPost(orgNumber, topicId, body);

export const updateCommentById = (
  orgNumber: string,
  topicId: string,
  commentId: string,
  body: any
) => updateCommentByIdPut(orgNumber, topicId, commentId, body);

export const deleteCommentByIdApi = (
  orgNumber: string,
  topicId: string,
  commentId: string
) => deleteCommentById(orgNumber, topicId, commentId);
