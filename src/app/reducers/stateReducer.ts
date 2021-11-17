export const CONCEPT_STATUS_PATCH_SUCCESS: string =
  'CONCEPT_STATUS_PATCH_SUCCESS';
export const CONCEPT_STATUS_IS_SAVING: string = 'CONCEPT_STATUS_IS_SAVING';
export const CONCEPT_STATUS_SAVE_ERROR: string = 'CONCEPT_STATUS_SAVE_ERROR';
export const CONCEPT_STATUS_VALIDATION_ERROR: string =
  'CONCEPT_STATUS_VALIDATION_ERROR';

export const conceptPatchSuccessAction = (
  conceptId: string,
  justChangedStatus: boolean,
  patchResponse: any
) => ({
  type: CONCEPT_STATUS_PATCH_SUCCESS,
  payload: {
    conceptId,
    justChangedStatus,
    patchResponse
  }
});

export const conceptPatchIsSavingAction = conceptId => ({
  type: CONCEPT_STATUS_IS_SAVING,
  payload: {
    conceptId
  }
});

export const conceptPatchErrorAction = (conceptId, error): any => ({
  type: CONCEPT_STATUS_SAVE_ERROR,
  payload: {
    conceptId,
    error
  }
});

export const conceptValidationErrorAction = (
  conceptId: string,
  error: boolean
) => ({
  type: CONCEPT_STATUS_VALIDATION_ERROR,
  payload: {
    conceptId,
    error
  }
});

export type Action = { type: string; payload: any };

export const stateReducer = (state, action: Action): any => {
  switch (action.type) {
    case CONCEPT_STATUS_IS_SAVING: {
      const { conceptId } = action.payload;
      return {
        ...state,
        [conceptId]: {
          ...state?.[conceptId],
          isSaving: true
        }
      };
    }
    case CONCEPT_STATUS_PATCH_SUCCESS: {
      const { conceptId, justChangedStatus, patchResponse } = action.payload;
      const status = patchResponse?.status;
      const endringstidspunkt =
        patchResponse?.endringslogelement?.endringstidspunkt;
      const anbefaltTerm = patchResponse?.anbefaltTerm;
      const revisjonAvSistPublisert =
        patchResponse?.revisjonAvSistPublisert ?? true;
      const erSistPublisert = patchResponse?.erSistPublisert ?? false;
      return {
        ...state,
        [conceptId]: {
          ...state?.[conceptId],
          isSaving: false,
          status,
          revisjonAvSistPublisert,
          erSistPublisert,
          justChangedStatus,
          endringstidspunkt,
          anbefaltTerm,
          error: false,
          lastPatchedResponse: patchResponse
        }
      };
    }
    case CONCEPT_STATUS_SAVE_ERROR: {
      const { conceptId, error } = action.payload;
      return {
        ...state,
        [conceptId]: {
          ...state?.[conceptId],
          isSaving: false,
          error
        }
      };
    }
    case CONCEPT_STATUS_VALIDATION_ERROR: {
      const { conceptId, error } = action.payload;
      return {
        ...state,
        [conceptId]: {
          ...state?.[conceptId],
          validationError: error
        }
      };
    }
    default:
      return state;
  }
};
