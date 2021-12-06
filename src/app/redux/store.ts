import { configureStore } from '@reduxjs/toolkit';

import { commentsReducer } from '../../features/comments';
import { languageReducer } from '../../features/language';
import { conceptFormReducer } from '../../features/conceptForm';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    languages: languageReducer,
    conceptForm: conceptFormReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
