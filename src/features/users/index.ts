import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';

import type { CatalogUser } from '../../types';
import type { RootState } from '../../app/redux/store';

import { getUsersByCatalogIdApiGet } from '../../api/catalog-admin-api/users';

interface UsersAttributes {
  catalogId: string;
}

export const fetchUsers = createAsyncThunk<CatalogUser[], UsersAttributes>(
  'users/fetchUsers',
  async ({ catalogId }) =>
    getUsersByCatalogIdApiGet(catalogId).then(response => response.users)
);

const usersAdapter = createEntityAdapter<CatalogUser>({
  selectId: user => user.id,
  sortComparer: (a, b) => {
    if (a.name == null || b.name == null) {
      if (a.name == null && b.name == null) {
        return 0;
      }
      if (a.name == null) {
        return -1;
      }
      return 1;
    }

    return a.name.localeCompare(b.name ?? '');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    resetInterfalFields: usersAdapter.removeAll
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.upsertMany);
  }
});

const usersSelector = usersAdapter.getSelectors<RootState>(
  state => state.users
);

export const selectAllUsers = usersSelector.selectAll;

export const selectUserById = usersAdapter.getSelectors<RootState>(
  state => state.users
).selectById;

export const { reducer: usersReducer } = usersSlice;

export const { actions: usersActions } = usersSlice;
