import React, { FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import get from 'lodash/get';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Concept } from '../../types';

import { useDispatch, useGlobalState } from '../../app/context/stateContext';
import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept';
import { conceptPatchSuccessAction } from '../../app/reducers/stateReducer';

import Root from '../../components/root';

import SC from './styled';
import { getConcept } from '../../api/concept-catalogue-api';
import { CommentList } from '../../components/commentList';

interface RouteParams {
  conceptId: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

const ConceptRegistrationPagePure: FC<Props> = ({
  match: {
    params: { conceptId }
  }
}) => {
  const [concept, setConcept] = useState<Concept>();
  const globalStateValues = useGlobalState(conceptId);
  const dispatch = useDispatch();

  useEffect(() => {
    getConcept(conceptId).then(fetchedConcept => {
      setConcept(fetchedConcept);
      dispatch(
        conceptPatchSuccessAction(fetchedConcept.id, false, fetchedConcept)
      );
    });
  }, [conceptId]);

  return (
    <Root>
      <SC.Container>
        {concept && globalStateValues && (
          <FormConcept
            concept={concept}
            dispatch={dispatch}
            lastPatchedResponse={get(globalStateValues, 'lastPatchedResponse')}
            isSaving={globalStateValues.isSaving}
          />
        )}
        <CommentList />
      </SC.Container>
    </Root>
  );
};

export default compose<FC<Props>>(withRouter)(ConceptRegistrationPagePure);
