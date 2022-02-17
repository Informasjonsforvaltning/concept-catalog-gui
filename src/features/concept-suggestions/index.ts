import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';

import { SkosConcept } from '../../types';
import type { RootState } from '../../app/redux/store';
import {
  getConceptSuggestions,
  extractSuggestions
} from '../../api/search-fulltext-api/suggestions';

interface SuggestionsAttributes {
  q: string;
  publisherId?: string;
}
export const fetchConceptSuggestions = createAsyncThunk<
  SkosConcept[],
  SuggestionsAttributes
>('conceptForm/fetchConceptSuggestions', async ({ q, publisherId }) =>
  getConceptSuggestions({ q, publisherId }).then(extractSuggestions)
);

const conceptSuggestionsAdapter = createEntityAdapter<SkosConcept>({
  selectId: concept => concept.identifier
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

const conceptSuggestionsSelector =
  conceptSuggestionsAdapter.getSelectors<RootState>(
    state => state.conceptSuggestions
  );

export const selectAllConceptSuggestions = conceptSuggestionsSelector.selectAll;

export const { reducer: conceptSuggestionsReducer } = conceptSuggestionSlice;
