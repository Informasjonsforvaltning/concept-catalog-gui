import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { localization } from '../../../../lib/localization';
import './list-item.scss';

interface Props {
  col1: string;
  col2: string;
  col3: string;
  status: string;
  path: string;
}

export const ListItem = ({ col1, col2, col3, status, path }: Props): JSX.Element | null => {
  if (!(col1 || status)) {
    return null;
  }

  const statusClass = cx('fa', 'fa-circle', 'mr-2', 'd-none', 'd-sm-inline', {
    'fdk-color-cta': status === 'PUBLISH',
    'fdk-color3': status === 'DRAFT'
  });

  return (
    <Link to={path} className="row fdk-list-item">
      <span className="col-3">{col1}</span>
      <span className="col-3">{col2}</span>
      <span className="col-3">{col3}</span>
      <span className="col-3">
        <i className={statusClass} />
        {status === 'PUBLISH' && <span>{localization['published']}</span>}
        {status === 'DRAFT' && <span>{localization['draft']}</span>}
      </span>
    </Link>
  );
};
