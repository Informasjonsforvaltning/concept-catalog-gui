import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';

import type { ReferenceDataCode } from '../../types';
import type { RootState } from '../../app/redux/store';
import { getConceptStatuses } from '../../api/reference-data-api/concept-statuses';
import { prepareStatusList } from './utils';

export const fetchConceptStatuses = createAsyncThunk<ReferenceDataCode[]>(
  'referenceData/fetchConceptStatuses',
  async () =>
    getConceptStatuses().then(response =>
      prepareStatusList(response.conceptStatuses)
    )
);

const conceptStatusesAdapter = createEntityAdapter<ReferenceDataCode>({
  selectId: status => status.uri,
  sortComparer: (a, b) => a.code.localeCompare(b.code)
});

const conceptStatusesSlice = createSlice({
  name: 'conceptStatuses',
  initialState: conceptStatusesAdapter.getInitialState(),
  reducers: {
    resetInterfalFields: conceptStatusesAdapter.removeAll
  },
  extraReducers: builder => {
    builder.addCase(
      fetchConceptStatuses.fulfilled,
      conceptStatusesAdapter.upsertMany
    );
  }
});

const conceptStatusesSelector = conceptStatusesAdapter.getSelectors<RootState>(
  state => state.conceptStatuses
);

export const selectConceptStatusByURI =
  conceptStatusesAdapter.getSelectors<RootState>(
    state => state.conceptStatuses
  ).selectById;

export const selectAllConceptStatuses = conceptStatusesSelector.selectAll;

export const { reducer: conceptStatusesReducer } = conceptStatusesSlice;

export const { actions: conceptStatusesActions } = conceptStatusesSlice;
