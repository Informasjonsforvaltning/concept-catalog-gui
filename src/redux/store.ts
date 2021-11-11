import { configureStore } from '@reduxjs/toolkit';

import { CommentReducer } from './enums';

import { commentReducer } from './comments';

export default configureStore({
  reducer: {
    [CommentReducer.name]: commentReducer
  }
});
