import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Concept } from '../../types';
import { getConcept, patchConcept } from '../../api/concept-catalogue-api';

interface PatchAttributes {
  conceptId: string;
  diff: any;
  justChangedStatus: boolean;
}

interface RejectValue {
  rejectValue: boolean;
}

export const fetchConceptById = createAsyncThunk<Concept, string>(
  'conceptForm/fetchConceptById',
  async conceptId => getConcept(conceptId)
);

export const patchConceptById = createAsyncThunk<
  Concept,
  PatchAttributes,
  RejectValue
>(
  'conceptForm/patchConceptById',
  async ({ conceptId, diff }, { rejectWithValue }) =>
    patchConcept(conceptId, diff)
      .then(response => response)
      .catch(() => rejectWithValue(true))
);

interface ConceptFormState {
  isSaving: boolean;
  justChangedStatus: boolean;
  isValidationError: boolean;
  error: boolean;
  concept?: Concept;
}

const initialState = {
  isSaving: false,
  justChangedStatus: false,
  isValidationError: false,
  error: false
} as ConceptFormState;

const conceptFormSlice = createSlice({
  name: 'conceptForm',
  initialState,
  reducers: {
    setIsSaving(state) {
      state.isSaving = true;
    },
    setValidationError(state, action) {
      state.isValidationError = action.payload;
    },
    resetConceptForm: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(fetchConceptById.fulfilled, (state, action) => ({
      ...state,
      isSaving: false,
      justChangedStatus: false,
      isValidationError: false,
      error: false,
      concept: action.payload
    }));
    builder.addCase(patchConceptById.fulfilled, (state, action) => ({
      ...state,
      isSaving: false,
      justChangedStatus: action.meta.arg.justChangedStatus,
      isValidationError: false,
      error: false,
      concept: action.payload
    }));
    builder.addCase(patchConceptById.rejected, state => ({
      ...state,
      isSaving: false,
      error: true
    }));
  }
});

export const { reducer: conceptFormReducer } = conceptFormSlice;
export const { setIsSaving, setValidationError, resetConceptForm } =
  conceptFormSlice.actions;
