import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Concept } from '../../types';
import {
  getConcept,
  patchConcept,
  publishConcept
} from '../../api/concept-catalog-api';
import { postConceptWithPreProcess } from '../../pages/concept-registration-page/form-concept/utils';

interface PostNewAttributes {
  concept: Concept;
}

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

export const postNewConcept = createAsyncThunk<
  string,
  PostNewAttributes,
  RejectValue
>('conceptForm/postNewConcept', async ({ concept }, { rejectWithValue }) =>
  postConceptWithPreProcess(concept.ansvarligVirksomhet.id + 1, concept)
    .then(response => response)
    .catch(() => rejectWithValue(true))
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

export const publishConceptById = createAsyncThunk<Concept, string>(
  'conceptForm/publishConceptById',
  async (conceptId, { rejectWithValue }) =>
    publishConcept(conceptId)
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
    setConcept(state, action) {
      state.concept = action.payload;
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
    builder.addCase(postNewConcept.fulfilled, state => ({
      ...state,
      isSaving: false,
      justChangedStatus: false,
      isValidationError: false,
      error: false
    }));
    builder.addCase(postNewConcept.rejected, state => ({
      ...state,
      isSaving: false,
      error: true
    }));
    builder.addCase(publishConceptById.fulfilled, (state, action) => ({
      ...state,
      isSaving: false,
      justChangedStatus: true,
      isValidationError: false,
      error: false,
      concept: action.payload
    }));
    builder.addCase(publishConceptById.rejected, state => ({
      ...state,
      isSaving: false,
      error: true
    }));
  }
});

export const { reducer: conceptFormReducer } = conceptFormSlice;
export const { setIsSaving, setValidationError, setConcept, resetConceptForm } =
  conceptFormSlice.actions;
