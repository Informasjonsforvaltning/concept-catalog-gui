import React, { FC, FormEvent, memo, useState } from 'react';
import { Variant } from '@fellesdatakatalog/button';

import { Comment as CommentProps } from '../../../../types';
import { TimeFormat } from '../../../../types/enums';
import { formatTime } from '../../../../utils/date';
import { localization } from '../../../../lib/localization';
import { convertToSanitizedHtml } from '../../../../lib/markdown-converter';
import { authService } from '../../../../services/auth-service';

import { useAppDispatch } from '../../../../app/redux/hooks';
import { deleteComment, updateComment } from '../../../../features/comments';

import ConfirmDialog from '../../../confirm-dialog';

import CommentInputField from '../comment-input-field';

import SC from './styled';

interface Props {
  comment: CommentProps;
}

const Comment: FC<Props> = ({ comment }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const userId = authService.getUser()?.username;

  const updateCommentHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateComment({
        orgNumber: comment.orgNumber,
        topicId: comment.topicId,
        commentId: comment.id,
        comment: e.currentTarget.comment.value
      })
    );
    setEditMode(false);
  };

  const deleteCommentHandler = () => {
    dispatch(
      deleteComment({
        orgNumber: comment.orgNumber,
        topicId: comment.topicId,
        commentId: comment.id
      })
    );
  };

  const toggleEditComment = () => {
    setEditMode(!editMode);
  };

  const toggleShowConfirmDelete = (): void =>
    setShowConfirmDelete(!showConfirmDelete);

  return (
    <SC.Comment $positionAbsolute={showConfirmDelete}>
      <SC.UserAndDateLabels>
        {comment.user && (
          <SC.UserLabel>
            {comment.user?.name ?? comment.user?.email}:
          </SC.UserLabel>
        )}
        <SC.DateLabel>
          {comment.lastChangedDate
            ? formatTime(comment.lastChangedDate, TimeFormat.dateAndHour)
            : formatTime(comment.createdDate, TimeFormat.dateAndHour)}
        </SC.DateLabel>
      </SC.UserAndDateLabels>
      {editMode ? (
        <CommentInputField
          defaultText={comment.comment}
          onSubmit={updateCommentHandler}
          onSubmitLabel={localization.changeComment}
          onCancel={() => toggleEditComment()}
          showCancelButton
        />
      ) : (
        <>
          <SC.CommentText
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(comment.comment)
            }}
          />
          {userId && userId === comment.user?.id && (
            <SC.ControlButtons>
              <SC.ChangeButton
                onClick={() => toggleEditComment()}
                variant={Variant.TERTIARY}
              >
                {localization.changeComment}
              </SC.ChangeButton>
              <SC.DeleteButton
                onClick={toggleShowConfirmDelete}
                variant={Variant.TERTIARY}
              >
                {localization.deleteComment}
              </SC.DeleteButton>
            </SC.ControlButtons>
          )}
        </>
      )}
      {showConfirmDelete && (
        <ConfirmDialog
          title={localization.confirmDeleteTitle}
          text={localization.confirmDeleteComment}
          onConfirm={deleteCommentHandler}
          onCancel={toggleShowConfirmDelete}
        />
      )}
    </SC.Comment>
  );
};

export default memo(Comment);
