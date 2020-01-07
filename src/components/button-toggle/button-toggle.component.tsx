import React from 'react';
import './button-toggle.scss';
import { localization } from '../../lib/localization';

interface Props {
  expanded: boolean;
  toggle: any;
}

export const ButtonToggle = ({ expanded, toggle }: Props): JSX.Element => {
  const icon = expanded ? 'icon-collapse-text-sm.svg' : 'icon-expand-text-sm.svg';
  return (
    <button type="button" className="toggleExpandButton d-flex align-items-center" onClick={toggle}>
      <img className="chevronIcon" src={`/img/${icon}`} alt="icon" />
      {expanded ? localization.collapse : localization.expand}
    </button>
  );
};
