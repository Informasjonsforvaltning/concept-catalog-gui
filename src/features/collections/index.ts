import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';

import { Collection } from '../../types';
import type { RootState } from '../../app/redux/store';
import { getCollections } from '../../api/concept-catalog-api';

export const fetchCollections = createAsyncThunk<Collection[]>(
  'collections/fetchCollections',
  async () => getCollections()
);

const collectionsAdapter = createEntityAdapter<Collection>();

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: collectionsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCollections.fulfilled, collectionsAdapter.upsertMany);
  }
});

const collectionsSelector = collectionsAdapter.getSelectors<RootState>(
  state => state.collections
);

export const selectAllCollections = collectionsSelector.selectAll;

export const { reducer: collectionsReducer } = collectionsSlice;
