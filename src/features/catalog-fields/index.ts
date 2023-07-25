import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { CatalogFields } from '../../types';

import { getFieldsByCatalogIdApiGet } from '../../api/catalog-admin-api/fields';

interface CatalogFieldsAttributes {
  catalogId: string;
}

export const fetchCatalogFields = createAsyncThunk<
  CatalogFields,
  CatalogFieldsAttributes
>('catalogFields/fetchFields', async ({ catalogId }) =>
  getFieldsByCatalogIdApiGet(catalogId)
);

interface CatalogFieldsState {
  catalogFields?: CatalogFields;
}

const initialState = {} as CatalogFieldsState;

const catalogFieldsSlice = createSlice({
  name: 'catalogFields',
  initialState,
  reducers: {
    resetCatalogFields: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(fetchCatalogFields.fulfilled, (state, action) => {
      state.catalogFields = action.payload;
    });
  }
});

export const { reducer: catalogFieldsReducer } = catalogFieldsSlice;

export const { resetCatalogFields } = catalogFieldsSlice.actions;
