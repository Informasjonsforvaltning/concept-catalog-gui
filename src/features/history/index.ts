import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/redux/store';
import type { Updates } from '../../types';

interface UpdateProps {
  conceptId: string;
  resourceId: string;
  body?: any;
}

export const getupdateByConceptId = createAsyncThunk<Updates[], UpdateProps>(
  'concepts/getupdateByConceptId',
  async ({ conceptId }) => getupdateByConceptId(conceptId)
);

export const getupdateByConceptIdAndResourceId = createAsyncThunk<
  Updates,
  UpdateProps
>(
  'concepts/getupdateByConceptIdAndResourceId',
  async ({ conceptId, resourceId }) =>
    getupdateByConceptIdAndResourceId(conceptId, resourceId)
);

export const postupdateByConceptId = createAsyncThunk<Updates, UpdateProps>(
  'concepts/postupdateByConceptId',
  async ({ conceptId, body }) => postupdateByConceptId(conceptId, body)
);

const updateAdapter = createEntityAdapter<Updates>({
  sortComparer: (a, b) => a.datetime.localeCompare(b.datetime)
});

const updateSlice = createSlice({
  name: 'updates',
  initialState: updateAdapter.getInitialState(),
  reducers: {
    resetUpdates: updateAdapter.removeAll
  },
  extraReducers: builder => {
    builder.addCase(getupdateByConceptId.fulfilled, updateAdapter.upsertMany);
    builder.addCase(
      getupdateByConceptIdAndResourceId.fulfilled,
      updateAdapter.upsertOne
    );
    builder.addCase(postupdateByConceptId.fulfilled, updateAdapter.upsertOne);
  }
});

const updateSelector = updateAdapter.getSelectors<RootState>(
  state => state.updates
);

export const selectAllUpdates = updateSelector.selectAll;

export const { reducer: updateReducer, actions: updateActions } = updateSlice;
