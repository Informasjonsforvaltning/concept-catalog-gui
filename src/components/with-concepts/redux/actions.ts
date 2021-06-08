import {
  SEARCH_CONCEPTS_REQUESTED,
  SEARCH_CONCEPTS_SUCCEEDED,
  SEARCH_CONCEPTS_FAILED
} from './actions-types';

import type { Concept } from '../../../types';

export function searchConceptsRequested(
  query: string,
  orgNumber: string,
) {
  return {SEARCH_CONCEPTS_REQUESTED,
    type: SEARCH_CONCEPTS_REQUESTED,
    payload: {
      query,
      orgNumber
    }
  };
}

export function searchConceptsSucceeded(concepts: Concept[]) {
  return {
    type: SEARCH_CONCEPTS_SUCCEEDED,
    payload: {
      concepts
    }
  };
}

export function searchConceptsFailed(message: string) {
  return {
    type: SEARCH_CONCEPTS_FAILED,
    payload: {
      message
    }
  };
}
