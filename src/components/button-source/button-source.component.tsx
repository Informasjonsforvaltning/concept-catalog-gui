import React from 'react';
import './button-source.scss';
import { ReactComponent as IconAdd } from '../../assets/img/icon-add-cicle-sm.svg';
import { ReactComponent as IconRemove } from '../../assets/img/icon-remove-circle-sm.svg';

interface Props {
  add?: boolean;
  remove?: boolean;
  title: string;
  handleClick: any;
}

export const ButtonSource = ({ title, handleClick, remove, add }: Props): JSX.Element => (
  <button
    type="button"
    aria-haspopup="true"
    aria-expanded="false"
    className="fdk-btn-no-border color-link-dark mb-2"
    onClick={handleClick}
  >
    {remove && <IconRemove className="remove mr-2" />}
    {add && <IconAdd className="add mr-2" />}

    <span className={`${add ? 'fdk-color-link' : 'fdk-color-warning'}`}>{title}</span>
  </button>
);
