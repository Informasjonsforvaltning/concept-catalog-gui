import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import './help-text.scss';
import cx from 'classnames';
import { localization } from '../../lib/localization';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

import SC from './styled';

interface Props {
  title: string;
  helpTextAbstract?: string;
  helpTextDescription?: string;
  showRequired?: boolean;
}
/* eslint-disable react/no-danger */
export const HelpText = ({
  title,
  helpTextAbstract,
  helpTextDescription,
  showRequired = false
}: Props): JSX.Element => {
  const [collapse, setCollapse] = useState(false);

  const collapseClass = cx('fa', 'fdk-fa-left', {
    'fa-angle-double-down': !collapse,
    'fa-angle-double-up': collapse
  });

  const toggle = (): void => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <div className='fdk-reg-helptext mb-3 p-3'>
      <div className='d-flex align-items-center'>
        <SC.Title className='help-text mb-0'>{title}</SC.Title>
        {showRequired && (
          <span className='fdk-badge badge fdk-bg-color-warning-lightest ml-2'>
            {localization.required}
          </span>
        )}
      </div>

      <div className='d-md-flex'>
        {helpTextAbstract && (
          <p
            className='help-text mb-0'
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(helpTextAbstract)
            }}
          />
        )}
        {helpTextDescription && (
          <button
            type='button'
            className='fdk-btn-no-border text-left p-0 ml-1 fdk-reg-helptext-more align-self-start'
            onClick={toggle}
          >
            <i className={collapseClass} />
            {collapse
              ? localization.lessRecomendations
              : localization.moreRecomendations}
          </button>
        )}
      </div>

      {helpTextDescription && (
        <Collapse className='mt-3' isOpen={collapse}>
          <p
            className='help-text mb-0'
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(helpTextDescription)
            }}
          />
        </Collapse>
      )}
    </div>
  );
};
/* eslint-enable react/no-danger */
