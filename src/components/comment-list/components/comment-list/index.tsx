import React, { FC, FormEvent, memo, useState } from 'react';
import { compose } from '@reduxjs/toolkit';

import { Comment } from '../../../../types';
import { localization } from '../../../../lib/localization';

import { useAppDispatch } from '../../../../app/redux/hooks';
import { createComment } from '../../../../features/comments';

import CommentComponent from '../comment';
import CommentInputField from '../comment-input-field';

import SC from './styled';

interface ExternalProps {
  catalogId: string;
  topicId: string;
  comments: Comment[];
}

interface Props extends ExternalProps {}

const INITIAL_COUNT_SHOW_COMMENTS = 5;

export const CommentList: FC<Props> = ({ catalogId, topicId, comments }) => {
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const createCommentHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createComment({
        orgNumber: catalogId,
        topicId,
        comment: e.currentTarget.comment.value
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
            <CommentComponent key={comment.id} comment={comment} />
          ))
        : comments
            .slice(
              comments.length - INITIAL_COUNT_SHOW_COMMENTS,
              comments.length
            )
            .map(comment => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
      <CommentInputField
        onSubmit={createCommentHandler}
        onSubmitLabel={localization.addCommentLabel}
      />
    </SC.CommentList>
  );
};

export default compose<FC<ExternalProps>>(memo)(CommentList);
