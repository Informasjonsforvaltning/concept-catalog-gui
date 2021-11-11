import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';

import type { Comment } from '../../types';
import type { RootState } from '../../app/redux/store';

import {
  createComment as createCommentApi,
  deleteCommentByIdApi,
  getCommentsByTopicId,
  updateCommentById
} from '../../api/comments-api/comments';

interface CommentsAttributes {
  orgNumber: string;
  topicId: string;
  commentId?: string;
  comment?: string;
}

export const createComment = createAsyncThunk<Comment, CommentsAttributes>(
  'comments/createComment',
  async ({ orgNumber, topicId, comment }) =>
    createCommentApi(orgNumber, topicId, { comment })
);

export const fetchComments = createAsyncThunk<Comment[], CommentsAttributes>(
  'comments/fetchComments',
  async ({ orgNumber, topicId }) => getCommentsByTopicId(orgNumber, topicId)
);

export const updateComment = createAsyncThunk<Comment, CommentsAttributes>(
  'comments/updateComment',
  async ({ orgNumber, topicId, commentId = '', comment }) =>
    updateCommentById(orgNumber, topicId, commentId, { comment })
);

export const deleteComment = createAsyncThunk<string, CommentsAttributes>(
  'comments/deleteComment',
  async ({ orgNumber, topicId, commentId = '' }) =>
    deleteCommentByIdApi(orgNumber, topicId, commentId)
);

const commentAdapter = createEntityAdapter<Comment>({
  sortComparer: (a, b) => a.createdDate.localeCompare(b.createdDate)
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentAdapter.getInitialState(),
  reducers: {
    resetComments: commentAdapter.removeAll
  },
  extraReducers: builder => {
    builder.addCase(createComment.fulfilled, commentAdapter.addOne);
    builder.addCase(fetchComments.fulfilled, commentAdapter.upsertMany);
    builder.addCase(updateComment.fulfilled, commentAdapter.upsertOne);
    builder.addCase(deleteComment.fulfilled, commentAdapter.removeOne);
  }
});

const commentsSelector = commentAdapter.getSelectors<RootState>(
  state => state.comments
);

export const selectAllComments = commentsSelector.selectAll;

export const { reducer: commentsReducer } = commentsSlice;

export const { actions: commentActions } = commentsSlice;
