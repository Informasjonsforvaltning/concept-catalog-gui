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
import { Checkbox } from '../../components/checkbox';
import { CommentList } from '../../components/comment-list';
import History from '../../components/history';

interface RouteParams {
  catalogId: string;
  conceptId: string;
  resourceId?: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

const ConceptRegistrationPagePure: FC<Props> = ({
  match: {
    params: { catalogId, conceptId, resourceId }
  }
}) => {
  const [initialConcept, setInitialConcept] = useState<Concept>();

  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectAllComments);
  const { resetComments } = commentActions;

  const [showComments, setShowComments] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const conceptForm = useAppSelector(state => state.conceptForm);
  const { concept, isSaving } = conceptForm;

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

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
        <SC.Label key='Vis Kommentarer' htmlFor='showComments'>
          <Checkbox
            id='showComments'
            title='Vis kommentarer'
            checked={showComments}
            onChange={handleShowComments}
            disabled={false}
          />
          <span>Vis Kommentarer</span>
        </SC.Label>
        <SC.Label key='Vis Historikk' htmlFor='showHistory'>
          <Checkbox
            id='showHistory'
            title='Vis historikk'
            checked={showHistory}
            onChange={handleShowHistory}
            disabled={false}
          />
          <span>Vis Historikk</span>
        </SC.Label>
        {showComments && concept?.originaltBegrep && (
          <CommentList
            catalogId={catalogId}
            topicId={concept.originaltBegrep}
            comments={comments}
          />
        )}
        {showHistory && (
          <History conceptId={conceptId} resourceId={resourceId} />
        )}
      </SC.Container>
    </Root>
  );
};

export default compose<FC<Props>>(withRouter)(ConceptRegistrationPagePure);
