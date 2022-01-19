import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';

import { SkosConcept } from '../../types';
import type { RootState } from '../../app/redux/store';
import {
  extractConcepts,
  paramsToSearchBody,
  searchConcepts
} from '../../api/search-fulltext-api/concepts';

export const fetchConcepts = createAsyncThunk<SkosConcept[], string[]>(
  'conceptForm/fetchConcepts',
  async identifiers =>
    searchConcepts(paramsToSearchBody({ identifier: identifiers })).then(
      extractConcepts
    )
);

const conceptsAdapter = createEntityAdapter<SkosConcept>({
  selectId: concept => concept.identifier
});

const conceptsSlice = createSlice({
  name: 'concepts',
  initialState: conceptsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchConcepts.fulfilled, conceptsAdapter.upsertMany);
  }
});

const conceptsSelector = conceptsAdapter.getSelectors<RootState>(
  state => state.concepts
);

export const selectAllConceptEntities = conceptsSelector.selectEntities;

export const { reducer: conceptsReducer } = conceptsSlice;
