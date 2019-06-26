import React, { useState } from 'react';
import cx from 'classnames';
import { Collapse } from 'reactstrap';

import { localization } from '../../lib/localization';
import './form-template.scss';

interface Props {
  title: string;
  required?: boolean;
  children: object;
}

export const FormTemplate = ({ title, required = false, children }: Props): JSX.Element => {
  const [collapse, setCollapse] = useState(true);

  const toggle = (): void => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  const collapseClass = cx('fdk-reg_collapse', 'fdk-bg-color-white', 'py-4', 'px-5', {
    'fdk-reg_collapse_open': collapse
  });

  const collapseIconClass = cx('fa', 'fa-2x', 'ml-auto', 'fdk-color-blue-dark', {
    'fa-angle-down': !collapse,
    'fa-angle-up': collapse
  });

  return (
    <div className={collapseClass}>
      <button type="button" className="fdk-collapseButton fdk-btn-no-border w-100 p-0" onClick={toggle}>
        <div className="d-flex align-items-center">
          <h2 className="mb-0 text-ellipsis">{title}</h2>
          {required && <span className="fdk-badge badge fdk-bg-color-yellow-2 ml-2">{localization.required}</span>}
          <i className={collapseIconClass} />
        </div>
      </button>
      <Collapse className="mt-3" isOpen={collapse}>
        {children}
      </Collapse>
    </div>
  );
};
