import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';

import { Concept, SkosConcept } from '../../types';
import type { RootState } from '../../app/redux/store';
import {
  extractConcepts,
  extractInternalConcepts,
  paramsToSearchBody,
  searchConcepts
} from '../../api/search-fulltext-api/concepts';
import { searchInternalConcepts } from '../../api/concept-catalog-api';

interface InternalConceptFetchRequest {
  catalogId: string;
  values: string[];
}

export const fetchConcepts = createAsyncThunk<SkosConcept[], string[]>(
  'conceptForm/fetchConcepts',
  async identifiers =>
    searchConcepts(paramsToSearchBody({ identifier: identifiers })).then(
      extractConcepts
    )
);

export const fetchInternalConcepts = createAsyncThunk<
  Concept[],
  InternalConceptFetchRequest
>('conceptForm/fetchInternalConcepts', async ({ catalogId, values }) =>
  searchInternalConcepts(catalogId, values).then(extractInternalConcepts)
);

const conceptsAdapter = createEntityAdapter<SkosConcept>({
  selectId: concept => concept.identifier
});

const internalConceptsAdapter = createEntityAdapter<Concept>({
  selectId: internalConcepts => internalConcepts.id
});

const conceptsSlice = createSlice({
  name: 'concepts',
  initialState: conceptsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchConcepts.fulfilled, conceptsAdapter.upsertMany);
  }
});

const internalConceptsSlice = createSlice({
  name: 'internalConcepts',
  initialState: internalConceptsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchInternalConcepts.fulfilled,
      internalConceptsAdapter.upsertMany
    );
  }
});

const conceptsSelector = conceptsAdapter.getSelectors<RootState>(
  state => state.concepts
);

const internalConceptsSelector =
  internalConceptsAdapter.getSelectors<RootState>(
    state => state.internalConcepts
  );

export const selectAllConceptEntities = conceptsSelector.selectEntities;
export const selectAllInternalConceptEntities =
  internalConceptsSelector.selectEntities;

export const { reducer: internalConceptsReducer } = internalConceptsSlice;
export const { reducer: conceptsReducer } = conceptsSlice;
