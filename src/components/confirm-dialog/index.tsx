import React, { memo, FC } from 'react';
import { compose } from '@reduxjs/toolkit';
import { Variant } from '@fellesdatakatalog/button';

import { localization } from '../../lib/localization';

import SC from './styled';

interface Props {
  title: string;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: FC<Props> = ({ title, text, onCancel, onConfirm }) => (
  <SC.ConfirmDialog>
    <SC.Modal>
      <SC.ModalHeading>{title}</SC.ModalHeading>
      <SC.Text>{text}</SC.Text>
      <SC.ModalActions>
        <SC.ConfirmButton variant={Variant.PRIMARY} onClick={onConfirm}>
          {localization.confirm}
        </SC.ConfirmButton>
        <SC.CancelButton variant={Variant.TERTIARY} onClick={onCancel}>
          {localization.cancel}
        </SC.CancelButton>
      </SC.ModalActions>
    </SC.Modal>
  </SC.ConfirmDialog>
);

export default compose<FC<Props>>(memo)(ConfirmDialog);
