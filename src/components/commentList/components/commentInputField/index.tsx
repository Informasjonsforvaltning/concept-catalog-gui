import React, { FC, FormEvent, memo } from 'react';

import { localization } from '../../../../lib/localization';

import SC from './styled';

interface Props {
  defaultText?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSubmitLabel: string;
  onCancel?: () => void;
  onCancelLabel?: string;
  showCancelButton?: boolean;
}

const CommentInputField: FC<Props> = ({
  defaultText,
  onSubmit,
  onSubmitLabel,
  onCancel,
  showCancelButton = false
}) => (
  <SC.CommentInputForm noValidate onSubmit={onSubmit}>
    <SC.CommentInputField
      name='comment'
      placeholder={localization.commentInputFieldLabel}
      defaultValue={defaultText ?? ''}
    />
    <SC.ControlButtons>
      <SC.AddCommentButton type='submit'>{onSubmitLabel}</SC.AddCommentButton>
      {showCancelButton && (
        <SC.CancelButton onClick={onCancel}>
          {localization.cancel}
        </SC.CancelButton>
      )}
    </SC.ControlButtons>
  </SC.CommentInputForm>
);

export default memo(CommentInputField);
