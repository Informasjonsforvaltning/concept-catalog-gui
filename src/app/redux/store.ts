import { configureStore } from '@reduxjs/toolkit';

import { commentsReducer } from '../../features/comments';
import { languageReducer } from '../../features/language';
import { conceptFormReducer } from '../../features/conceptForm';
import { conceptsReducer } from '../../features/concepts';
import { collectionsReducer } from '../../features/collections';
import { publishersReducer } from '../../features/publishers';
import { conceptSuggestionsReducer } from '../../features/concept-suggestions';
import { updateReducer } from '../../features/history';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    updates: updateReducer,
    languages: languageReducer,
    conceptForm: conceptFormReducer,
    concepts: conceptsReducer,
    collections: collectionsReducer,
    publishers: publishersReducer,
    conceptSuggestions: conceptSuggestionsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
