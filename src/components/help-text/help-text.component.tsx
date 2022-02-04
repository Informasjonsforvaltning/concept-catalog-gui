import React, { useState } from 'react';
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

  const collapseClass = cx('fa', 'mr-2', {
    'fa-angle-double-down': !collapse,
    'fa-angle-double-up': collapse
  });

  const toggle = (): void => {
    setCollapse(!collapse);
  };

  return (
    <SC.HelpText>
      <div>
        <SC.Title className='help-text mb-0'>{title}</SC.Title>
        {showRequired && <SC.Required>{localization.required}</SC.Required>}
      </div>

      <div>
        {helpTextAbstract && (
          <p
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(helpTextAbstract)
            }}
          />
        )}
        {helpTextDescription && (
          <SC.ShowMoreButton type='button' onClick={toggle}>
            <i className={collapseClass} />
            {collapse
              ? localization.lessRecomendations
              : localization.moreRecomendations}
          </SC.ShowMoreButton>
        )}
      </div>

      {helpTextDescription && (
        <SC.CollapseDescription isOpen={collapse}>
          <p
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(helpTextDescription)
            }}
          />
        </SC.CollapseDescription>
      )}
    </SC.HelpText>
  );
};
/* eslint-enable react/no-danger */
