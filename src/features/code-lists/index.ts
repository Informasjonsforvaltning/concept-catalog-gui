import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';

import type { CodeList } from '../../types';
import type { RootState } from '../../app/redux/store';
import { getCodeListsByCatalogIdApiGet } from '../../api/catalog-admin-api/codelists';

interface CodeListsAttributes {
  catalogId: string;
}

export const fetchCodeLists = createAsyncThunk<CodeList[], CodeListsAttributes>(
  'codeLists/fetchCodeLists',
  async ({ catalogId }) =>
    getCodeListsByCatalogIdApiGet(catalogId).then(
      response => response.codeLists
    )
);

const codeListsAdapter = createEntityAdapter<CodeList>({
  selectId: codeList => codeList.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const codeListsSlice = createSlice({
  name: 'users',
  initialState: codeListsAdapter.getInitialState(),
  reducers: {
    resetInterfalFields: codeListsAdapter.removeAll
  },
  extraReducers: builder => {
    builder.addCase(fetchCodeLists.fulfilled, codeListsAdapter.upsertMany);
  }
});

const codeListsSelector = codeListsAdapter.getSelectors<RootState>(
  state => state.codeLists
);

export const selectAllCodeLists = codeListsSelector.selectAll;

export const { reducer: codeListsReducer } = codeListsSlice;

export const { actions: codeListsActions } = codeListsSlice;
