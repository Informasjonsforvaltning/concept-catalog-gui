import React, { FC, FormEvent, memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { localization } from '../../../../lib/localization';

import {
  createComment,
  fetchComments,
  commentSelectors,
  commentActions
} from '../../../../redux/comments';

import Comment from '../comment';
import CommentInputField from '../commentInputField';

import SC from './styled';

interface RouteParams {
  catalogId: string;
  conceptId: string;
}

interface ExternalProps {}

interface Props extends ExternalProps, RouteComponentProps<RouteParams> {}

const INITIAL_COUNT_SHOW_COMMENTS = 5;

export const CommentList: FC<Props> = ({
  match: {
    params: { catalogId, conceptId }
  }
}) => {
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { selectAllComments } = commentSelectors;
  const comments = useSelector(selectAllComments);
  const { resetComments } = commentActions;

  useEffect(() => {
    dispatch(fetchComments({ orgNumber: catalogId, topicId: conceptId }));
    return () => {
      dispatch(resetComments());
    };
  }, [conceptId]);

  const createCommentHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createComment({
        orgNumber: catalogId,
        topicId: conceptId,
        body: {
          comment: e.currentTarget.comment.value
        }
      })
    );
    e.currentTarget.reset();
  };

  return (
    <SC.CommentList>
      {!showAllComments && comments.length > INITIAL_COUNT_SHOW_COMMENTS && (
        <SC.ShowMoreCommentsButton onClick={() => setShowAllComments(true)}>
          {localization.showAllComments}
        </SC.ShowMoreCommentsButton>
      )}
      {showAllComments || comments.length <= INITIAL_COUNT_SHOW_COMMENTS
        ? comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        : comments
            .slice(
              comments.length - INITIAL_COUNT_SHOW_COMMENTS,
              comments.length
            )
            .map(comment => <Comment key={comment.id} comment={comment} />)}
      <CommentInputField
        onSubmit={createCommentHandler}
        onSubmitLabel={localization.addCommentLabel}
      />
    </SC.CommentList>
  );
};

export default compose<FC<ExternalProps>>(memo, withRouter)(CommentList);
