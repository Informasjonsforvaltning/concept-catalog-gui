import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Concept } from '../../types';

export interface Props {
  conceptSuggestions: Concept[];
  conceptsActions: typeof actions;
  isLoadingConceptSuggestions: boolean;
}

const withConcepts = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    conceptSuggestions:
      state.ConceptsReducer.get('conceptSuggestions')?.toJS() ?? [],
    isLoadingConceptSuggestions: state.ConceptsReducer.get(
      'isLoadingConceptSuggestions'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    conceptsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withConcepts;
