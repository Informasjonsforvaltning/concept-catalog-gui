import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Collapse } from 'reactstrap';

import ErrorIcon from '../../images/icon-alert-danger-md.svg';

import { localization } from '../../lib/localization';
import './form-template.scss';

interface Props {
  title: string;
  children: object;
  showRequired?: boolean;
  showInitially?: boolean;
  error?: boolean;
}

export const FormTemplate = ({
  title,
  children,
  showRequired = false,
  showInitially = false,
  error = false
}: Props): JSX.Element => {
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

  const collapseIconClass = cx('fa', 'fa-2x', 'fdk-color-link-dark', {
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
          <div className="ml-auto">
            {error && <ErrorIcon className="fdk-error-icon" />}

            <i className={collapseIconClass} />
          </div>
        </div>
      </button>
      <Collapse isOpen={collapse}>
        <hr />
        {children}
      </Collapse>
    </div>
  );
};
