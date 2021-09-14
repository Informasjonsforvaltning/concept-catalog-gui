import * as React from 'react';
import get from 'lodash/get';
import { localization } from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';
import { useGlobalState } from '../../../app/context/stateContext';

interface ConceptBreadcrumbProps {
  match: any;
}

export const ConceptBreadcrumb: React.FC<ConceptBreadcrumbProps> = ({
  match
}) => {
  const conceptId = get(match, ['params', 'conceptId']);
  const stateConcept = useGlobalState(conceptId);
  const anbefaltTerm = get(stateConcept, ['anbefaltTerm', 'navn']);
  return (
    <span>
      {getTranslateText(anbefaltTerm) || localization.registerNewConcept}
    </span>
  );
};
