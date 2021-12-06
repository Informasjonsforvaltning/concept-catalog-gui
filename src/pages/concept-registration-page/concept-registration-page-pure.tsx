import React, { FC, useEffect, useState } from 'react';
import { compose } from '@reduxjs/toolkit';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Concept } from '../../types';

import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept';

import { useAppSelector, useAppDispatch } from '../../app/redux/hooks';
import {
  fetchComments,
  commentActions,
  selectAllComments
} from '../../features/comments';
import { fetchConceptById, resetConceptForm } from '../../features/conceptForm';

import Root from '../../components/root';

import SC from './styled';
import { CommentList } from '../../components/comment-list';

interface RouteParams {
  catalogId: string;
  conceptId: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

const ConceptRegistrationPagePure: FC<Props> = ({
  match: {
    params: { catalogId, conceptId }
  }
}) => {
  const [initialConcept, setInitialConcept] = useState<Concept>();

  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectAllComments);
  const { resetComments } = commentActions;

  const conceptForm = useAppSelector(state => state.conceptForm);
  const { concept, isSaving } = conceptForm;

  useEffect(() => {
    dispatch(fetchConceptById(conceptId)).then(action => {
      const fetchedConcept: any = action.payload;
      setInitialConcept(fetchedConcept);
      fetchedConcept.originaltBegrep &&
        dispatch(
          fetchComments({
            orgNumber: catalogId,
            topicId: fetchedConcept.originaltBegrep
          })
        );
    });
    return () => {
      setInitialConcept(undefined);
      dispatch(resetComments());
      dispatch(resetConceptForm());
    };
  }, [conceptId]);

  return (
    <Root>
      <SC.Container>
        {initialConcept && concept && (
          <FormConcept
            concept={initialConcept}
            dispatch={dispatch}
            lastPatchedResponse={concept}
            isSaving={isSaving}
          />
        )}
        {concept?.originaltBegrep && (
          <CommentList
            catalogId={catalogId}
            topicId={concept.originaltBegrep}
            comments={comments}
          />
        )}
      </SC.Container>
    </Root>
  );
};

export default compose<FC<Props>>(withRouter)(ConceptRegistrationPagePure);
