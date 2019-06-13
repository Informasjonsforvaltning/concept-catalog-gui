import React from 'react';
import _ from 'lodash';
import useGlobalHook from 'use-global-hook';
import { registrationApiGet } from '../../api/registration-api';

const shouldFetch = metaState => {
  const threshold = 60 * 1000; // seconds
  return !metaState || (metaState.lastFetch || 0) < Date.now() - threshold;
};

const actions = {
  fetchConceptsIfNeededAction: (store, catalogId) => {
    if (!shouldFetch(_.get(store, ['state', catalogId, 'meta']))) {
      return;
    }

    registrationApiGet('mock.json')
      .then(response =>
        store.setState({
          [catalogId]: {
            items: _.get(response, 'concepts'),
            meta: {
              lastFetch: Date.now()
            }
          }
        })
      )
      .catch(
        store.setState({
          [catalogId]: {
            meta: {
              lastFetch: undefined
            }
          }
        })
      );
  }
};

const initialState = {
  meta: {
    lastFetch: null
  }
};

export const useConceptsState = useGlobalHook(React, initialState, actions);
