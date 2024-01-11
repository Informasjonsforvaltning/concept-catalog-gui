import { configureStore } from '@reduxjs/toolkit';

import { languageReducer } from '../../features/language';
import { conceptFormReducer } from '../../features/conceptForm';
import {
  conceptsReducer,
  internalConceptsReducer
} from '../../features/concepts';
import { collectionsReducer } from '../../features/collections';
import { publishersReducer } from '../../features/publishers';
import {
  conceptSuggestionsReducer,
  internalConceptSuggestionsReducer
} from '../../features/concept-suggestions';
import { catalogFieldsReducer } from '../../features/catalog-fields';
import { usersReducer } from '../../features/users';
import { codeListsReducer } from '../../features/code-lists';
import { conceptStatusesReducer } from '../../features/concept-statuses';

export const store = configureStore({
  reducer: {
    languages: languageReducer,
    conceptForm: conceptFormReducer,
    concepts: conceptsReducer,
    internalConcepts: internalConceptsReducer,
    collections: collectionsReducer,
    publishers: publishersReducer,
    conceptSuggestions: conceptSuggestionsReducer,
    internalConceptSuggestions: internalConceptSuggestionsReducer,
    catalogFields: catalogFieldsReducer,
    users: usersReducer,
    codeLists: codeListsReducer,
    conceptStatuses: conceptStatusesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
