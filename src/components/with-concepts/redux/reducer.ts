import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  SEARCH_CONCEPTS_REQUESTED,
  SEARCH_CONCEPTS_SUCCEEDED,
  SEARCH_CONCEPTS_FAILED
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  conceptSuggestions: [],
  isLoadingConceptSuggestions: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case SEARCH_CONCEPTS_REQUESTED:
      return state
        .set('isLoadingConceptSuggestions', true);
    case SEARCH_CONCEPTS_SUCCEEDED:
      return state
        .set('conceptSuggestions', fromJS(action.payload.concepts))
        .set('isLoadingConceptSuggestions', false);
    case SEARCH_CONCEPTS_FAILED:
      return state
      .set('conceptSuggestions', fromJS([]))
      .set('isLoadingConceptSuggestions', false);
    default:
      return state;
  }
}
