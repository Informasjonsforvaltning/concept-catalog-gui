import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import './help-text.scss';
import cx from 'classnames';
import { localization } from '../../lib/localization';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

interface Props {
  title: string;
  helpTextAbstract?: string;
  helpTextDescription?: string;
  required: boolean;
}

export const HelpText = ({ title, helpTextAbstract, helpTextDescription, required }: Props): JSX.Element => {
  const [collapse, setCollapse] = useState(false);

  const collapseClass = cx('fa', 'fdk-fa-left', {
    'fa-angle-double-down': !collapse,
    'fa-angle-double-up': collapse
  });

  const toggle = (): void => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <div className="fdk-reg-helptext mb-3 p-3">
      <div className="d-flex align-items-center">
        <h3 className="help-text">{title}</h3>
        {required && (
          <span className="fdk-badge badge fdk-bg-color-warning-lightest ml-2">{localization.required}</span>
        )}
      </div>

      <div className="d-md-flex">
        {helpTextAbstract && (
          <p
            className="help-text m-0"
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(helpTextAbstract)
            }}
          />
        )}
        {helpTextDescription && (
          <button
            type="button"
            className="fdk-btn-no-border text-left p-0 ml-1 fdk-reg-helptext-more align-self-start"
            onClick={toggle}
          >
            <i className={collapseClass} />
            {collapse ? localization.lessRecomendations : localization.moreRecomendations}
          </button>
        )}
      </div>

      {helpTextDescription && (
        <Collapse className="mt-3" isOpen={collapse}>
          <p
            className="help-text"
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(helpTextDescription)
            }}
          />
        </Collapse>
      )}
    </div>
  );
};
