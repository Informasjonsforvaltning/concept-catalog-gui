import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { localization } from '../../../../../lib/localization';
import './list-item.scss';

interface Props {
  col1: string | null;
  col2: string | null;
  col3: string | null;
  status: string;
  path: string;
}

export const ListItem: FC<Props> = ({ col1, col2, col3, status, path }) => {
  if (!(col1 || status)) {
    return null;
  }

  const statusClass = cx('fa', 'fa-circle', 'mr-2', 'd-none', 'd-sm-inline', {
    'fdk-color-primary': status === 'publisert',
    'fdk-color-neutral-dark': status === 'utkast'
  });

  return (
    <Link to={path} className='row fdk-list-item'>
      <span className='col-3'>{col1}</span>
      <span className='col-3'>{col2}</span>
      <span className='col-3'>{col3}</span>
      <span className='col-3'>
        <i className={statusClass} />
        {status === 'publisert' && <span>{localization.published}</span>}
        {status === 'utkast' && <span>{localization.draft}</span>}
      </span>
    </Link>
  );
};
