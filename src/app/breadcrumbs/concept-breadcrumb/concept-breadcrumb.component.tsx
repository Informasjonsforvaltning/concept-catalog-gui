import * as React from 'react';
import get from 'lodash/get';
import { StateConsumer } from '../../context/stateContext';
import { localization } from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';

interface ConceptBreadcrumbProps {
  name: string;
  match: object;
}

export const ConceptBreadcrumb: React.FC<ConceptBreadcrumbProps> = ({ match }) => {
  const conceptId = get(match, ['params', 'conceptId']);
  return (
    <StateConsumer>
      {value => {
        const anbefaltTerm = get(value, ['statusBarState', conceptId, 'anbefaltTerm', 'navn']);
        return getTranslateText(anbefaltTerm) || localization.newConcept;
      }}
    </StateConsumer>
  );
};
