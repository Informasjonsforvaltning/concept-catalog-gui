import { configureStore } from '@reduxjs/toolkit';

import { commentsReducer } from '../../features/comments';
import { languageReducer } from '../../features/language';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    languages: languageReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
