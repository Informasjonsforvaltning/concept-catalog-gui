import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';

import { Concept, SearchObject } from '../../types';
import type { RootState } from '../../app/redux/store';
import {
  getConceptSuggestions,
  extractSuggestions
} from '../../api/search-api/suggestions';
import { getInternalConceptSuggestions } from '../../api/concept-catalog-api';

interface SuggestionsAttributes {
  q: string;
  org?: string;
}
interface InternalSuggestionsAttributes {
  query: string;
  publisherId: string;
}

export const fetchConceptSuggestions = createAsyncThunk<
  SearchObject[],
  SuggestionsAttributes
>('conceptForm/fetchConceptSuggestions', async ({ q, org }) =>
  getConceptSuggestions({ q, org }).then(extractSuggestions)
);

export const fetchInternalConceptSuggestions = createAsyncThunk<
  Concept[],
  InternalSuggestionsAttributes
>(
  'conceptForm/fetchInternalConceptSuggestions',
  async ({ query, publisherId }) =>
    getInternalConceptSuggestions(publisherId, query)
);

const conceptSuggestionsAdapter = createEntityAdapter<SearchObject>({
  selectId: concept => concept.uri
});

const internalConceptSuggestionsAdapter = createEntityAdapter<Concept>({
  selectId: concept => concept.id
});

const conceptSuggestionSlice = createSlice({
  name: 'conceptSuggestions',
  initialState: conceptSuggestionsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchConceptSuggestions.fulfilled,
      conceptSuggestionsAdapter.setAll
    );
  }
});

const internalConceptSuggestionSlice = createSlice({
  name: 'internalConceptSuggestions',
  initialState: internalConceptSuggestionsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchInternalConceptSuggestions.fulfilled,
      internalConceptSuggestionsAdapter.setAll
    );
  }
});

const conceptSuggestionsSelector =
  conceptSuggestionsAdapter.getSelectors<RootState>(
    state => state.conceptSuggestions
  );

const internalConceptSuggestionsSelector =
  internalConceptSuggestionsAdapter.getSelectors<RootState>(
    state => state.internalConceptSuggestions
  );

export const selectAllConceptSuggestions = conceptSuggestionsSelector.selectAll;
export const selectAllInternalConceptSuggestions =
  internalConceptSuggestionsSelector.selectAll;

export const { reducer: conceptSuggestionsReducer } = conceptSuggestionSlice;
export const { reducer: internalConceptSuggestionsReducer } =
  internalConceptSuggestionSlice;
