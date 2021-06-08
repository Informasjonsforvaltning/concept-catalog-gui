import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {searchConcepts} from '../../../api/concept-catalogue-api'

import {
  SEARCH_CONCEPTS_REQUESTED
} from './actions-types';
import * as actions from './actions';

import type { Concept } from '../../../types';

function* searchConceptsRequested({
  payload: {
    query,
    orgNumber
  }
}: ReturnType<typeof actions.searchConceptsRequested>) {
  try {
    const concepts: Concept[] = yield call(
      searchConcepts,
      orgNumber,
      query
    )

    if (Array.isArray(concepts)) {
      yield put(actions.searchConceptsSucceeded(concepts));
    } else {
      yield put(
        actions.searchConceptsFailed(
          'An error occurred during an attempt to search the concepts catalog.'
        )
      );
    }
  } catch (error) {
    yield put(actions.searchConceptsFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(SEARCH_CONCEPTS_REQUESTED, searchConceptsRequested)
  ]);
}
