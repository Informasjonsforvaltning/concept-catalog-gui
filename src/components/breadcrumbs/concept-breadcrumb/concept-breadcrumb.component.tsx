import * as React from 'react';

import { localization } from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';
import { useAppSelector } from '../../../app/redux/hooks';

interface ConceptBreadcrumbProps {
  match: any;
}

export const ConceptBreadcrumb: React.FC<ConceptBreadcrumbProps> = () => {
  const conceptForm = useAppSelector(state => state.conceptForm);
  const anbefaltTerm = conceptForm.concept?.anbefaltTerm?.navn;
  return (
    <span>
      {getTranslateText(anbefaltTerm) || localization.registerNewConcept}
    </span>
  );
};
