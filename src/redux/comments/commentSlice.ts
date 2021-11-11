import {
  createSlice,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';

import { Comment } from '../../types';
import { CommentReducer } from '../enums';

import {
  createComment,
  deleteComment,
  fetchComments,
  updateComment
} from './services';

interface State {
  comments: EntityState<Comment>;
}

const commentAdapter = createEntityAdapter<Comment>({
  sortComparer: (a, b) => a.createdDate.localeCompare(b.createdDate)
});

const commentsSlice = createSlice({
  name: CommentReducer.name,
  initialState: commentAdapter.getInitialState(),
  reducers: {
    resetComments(state) {
      return commentAdapter.removeAll({ ...state });
    }
  },
  extraReducers: builder => {
    builder.addCase(createComment.fulfilled, (state, action) => {
      commentAdapter.upsertOne(state, (action.payload as Comment) ?? {});
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      commentAdapter.upsertMany(
        state,
        (action.payload.comments as Comment[]) ?? {}
      );
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      commentAdapter.upsertOne(state, (action.payload as Comment) ?? {});
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      commentAdapter.removeOne(state, action.payload);
    });
  }
});

export const { reducer: commentReducer } = commentsSlice;

export const { selectAll: selectAllComments } = commentAdapter.getSelectors(
  (state: State) => state.comments
);

export const { actions: commentActions } = commentsSlice;
