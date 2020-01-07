import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Collapse } from 'reactstrap';

import { localization } from '../../lib/localization';
import './form-template.scss';

interface Props {
  title: string;
  children: object;
  showRequired?: boolean;
  showInitially?: boolean;
}

export const FormTemplate = ({ title, children, showRequired = false, showInitially = false }: Props): JSX.Element => {
  const [collapse, setCollapse] = useState(showInitially);

  const toggle = (changeProp): void => {
    setCollapse(changeProp);
  };

  useEffect(() => {
    toggle(showInitially);
  }, [showInitially]);

  const collapseClass = cx('fdk-reg_collapse', 'fdk-bg-color-white', 'p-5', {
    'fdk-reg_collapse_open': collapse
  });

  const collapseIconClass = cx('fa', 'fa-2x', 'ml-auto', 'fdk-color-link-dark', {
    'fa-angle-down': !collapse,
    'fa-angle-up': collapse
  });

  return (
    <div className={collapseClass}>
      <button
        type="button"
        className="fdk-collapseButton fdk-btn-no-border w-100 p-0"
        onClick={() => toggle(!collapse)}
      >
        <div className="d-flex align-items-center">
          <h2 className="mb-0 text-ellipsis">{title}</h2>
          {showRequired && (
            <span className="fdk-badge badge fdk-bg-color-warning-lightest ml-2">{localization.required}</span>
          )}
          <i className={collapseIconClass} />
        </div>
      </button>
      <Collapse isOpen={collapse}>
        <hr />
        {children}
      </Collapse>
    </div>
  );
};
