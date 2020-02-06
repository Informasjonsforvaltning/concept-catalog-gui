import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useDispatch, useGlobalState } from '../../app/context/stateContext';
import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept/form-concept.component';
import { conceptPatchSuccessAction } from '../../app/reducers/stateReducer';
import { Concept } from '../../domain/Concept';

import { getTranslateText } from '../../lib/translateText';
import { localization } from '../../lib/localization';

interface Props {
  concept: Concept;
  history: object;
}

export const ConceptRegistrationPagePure: React.FC<Props> = ({ concept }) => {
  const globalStateValues = useGlobalState(concept.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(conceptPatchSuccessAction(concept.id, concept, concept));
  }, []);

  return (
    <div className="container">
      <div className="col-12">
        <h1 className="pb-5">
          {getTranslateText(get(globalStateValues, ['anbefaltTerm', 'navn'])) || localization.registerNewConcept}
        </h1>
        {globalStateValues && (
          <FormConcept
            concept={concept}
            dispatch={dispatch}
            lastPatchedResponse={get(globalStateValues, 'lastPatchedResponse')}
          />
        )}
      </div>
    </div>
  );
};
