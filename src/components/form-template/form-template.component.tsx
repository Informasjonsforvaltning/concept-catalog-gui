import React, { FC, PropsWithChildren, useState, useEffect } from 'react';
import { Collapse } from 'reactstrap';

import { localization } from '../../lib/localization';
import './form-template.scss';
import SC from './styled';

interface Props {
  title: string;
  showRequired?: boolean;
  showInitially?: boolean;
  error?: boolean;
}

export const FormTemplate: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  showRequired = false,
  showInitially = false,
  error = false
}) => {
  const [collapse, setCollapse] = useState(showInitially);

  const toggle = (changeProp): void => {
    setCollapse(changeProp);
  };

  useEffect(() => {
    toggle(showInitially);
  }, [showInitially]);

  return (
    <SC.FormTemplate>
      <SC.CollapseButton type='button' onClick={() => toggle(!collapse)}>
        <SC.Title className='mb-0 text-ellipsis'>{title}</SC.Title>
        {showRequired && (
          <SC.RequiredBadge>{localization.required}</SC.RequiredBadge>
        )}
        <div className='ml-auto'>
          {error && <SC.ErrorIcon />}
          {collapse ? <SC.CollapseIcon /> : <SC.ExpandIcon />}
        </div>
      </SC.CollapseButton>
      <Collapse isOpen={collapse}>
        <hr />
        {children}
      </Collapse>
    </SC.FormTemplate>
  );
};
