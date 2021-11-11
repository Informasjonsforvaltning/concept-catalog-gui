import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';

import {
  getCommentsByTopicId,
  createComment as createCommentApi,
  updateCommentById,
  deleteCommentByIdApi
} from '../../api/comments-api/comments';

import { commentEntity } from './schemas';

interface CreateCommentsArgs {
  orgNumber: string;
  topicId: string;
  body: any;
}

interface FetchCommentsArgs {
  orgNumber: string;
  topicId: string;
}

interface UpdateCommentsArgs {
  orgNumber: string;
  topicId: string;
  commentId: string;
  body: any;
}

interface DeleteCommentArgs {
  orgNumber: string;
  topicId: string;
  commentId: string;
}

export const createComment = createAsyncThunk<any, CreateCommentsArgs>(
  'comment/createComment',
  async ({ orgNumber, topicId, body }) =>
    createCommentApi(orgNumber, topicId, body)
);

export const fetchComments = createAsyncThunk<any, FetchCommentsArgs>(
  'comment/fetchComments',
  async ({ orgNumber, topicId }) => {
    const data = await getCommentsByTopicId(orgNumber, topicId);
    const normalized = normalize(data, [commentEntity]);
    return normalized.entities;
  }
);

export const updateComment = createAsyncThunk<any, UpdateCommentsArgs>(
  'comment/updateComment',
  async ({ orgNumber, topicId, commentId, body }) => {
    const data = await updateCommentById(orgNumber, topicId, commentId, body);
    return data;
  }
);

export const deleteComment = createAsyncThunk<any, DeleteCommentArgs>(
  'comment/deleteComment',
  async ({ orgNumber, topicId, commentId }) => {
    const deletedCommentId = await deleteCommentByIdApi(
      orgNumber,
      topicId,
      commentId
    );
    return deletedCommentId;
  }
);
