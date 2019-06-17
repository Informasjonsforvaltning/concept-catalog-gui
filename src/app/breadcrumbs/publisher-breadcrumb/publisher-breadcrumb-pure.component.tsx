import React from 'react';
import _ from 'lodash';
import { localization } from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';

export const PublisherBreadcrumbPure = ({ breadCrumbLabel, publisher }) => (
  <span>
    {localization.formatString(localization[breadCrumbLabel], getTranslateText(_.get(publisher, 'prefLabel')))}
  </span>
);
