import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter
} from '@reduxjs/toolkit';

import { Publisher } from '../../types';
import type { RootState } from '../../app/redux/store';
import { publisherApiGet } from '../../api/publisher-api';

export const fetchPublishers = createAsyncThunk<Publisher[]>(
  'publishers/fetchPublishers',
  async () => publisherApiGet('/organizations')
);

const publishersAdapter = createEntityAdapter<Publisher>({
  selectId: publisher => publisher.organizationId
});

const publishersSlice = createSlice({
  name: 'publishers',
  initialState: publishersAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPublishers.fulfilled, publishersAdapter.upsertMany);
  }
});

const publishersSelector = publishersAdapter.getSelectors<RootState>(
  state => state.publishers
);

export const selectAllPublisherEntities = publishersSelector.selectEntities;

export const { reducer: publishersReducer } = publishersSlice;
