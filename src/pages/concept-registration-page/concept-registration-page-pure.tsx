import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useDispatch, useGlobalState } from '../../app/context/stateContext';
import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept/form-concept.component';
import { conceptPatchSuccessAction } from '../../app/reducers/stateReducer';
import { Concept } from '../../types';

import { getTranslateText } from '../../lib/translateText';
import { localization } from '../../lib/localization';

import SC from './styled';

interface Props {
  concept: Concept;
}

export const ConceptRegistrationPagePure: React.FC<Props> = ({ concept }) => {
  const globalStateValues = useGlobalState(concept.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(conceptPatchSuccessAction(concept.id, false, concept));
  }, []);

  const copyOfConcept = JSON.parse(JSON.stringify(concept));

  return (
    <div className='container'>
      <div className='col-12'>
        <SC.Title className='pb-5'>
          {getTranslateText(get(globalStateValues, ['anbefaltTerm', 'navn'])) ||
            localization.registerNewConcept}
        </SC.Title>
        {globalStateValues && (
          <FormConcept
            concept={copyOfConcept}
            dispatch={dispatch}
            lastPatchedResponse={get(globalStateValues, 'lastPatchedResponse')}
            isSaving={globalStateValues.isSaving}
          />
        )}
      </div>
    </div>
  );
};
