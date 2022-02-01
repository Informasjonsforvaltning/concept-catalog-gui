import { configureStore } from '@reduxjs/toolkit';

import { commentsReducer } from '../../features/comments';
import { languageReducer } from '../../features/language';
import { conceptFormReducer } from '../../features/conceptForm';
import { conceptsReducer } from '../../features/concepts';
import { collectionsReducer } from '../../features/collections';
import { publishersReducer } from '../../features/publishers';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    languages: languageReducer,
    conceptForm: conceptFormReducer,
    concepts: conceptsReducer,
    collections: collectionsReducer,
    publishers: publishersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
