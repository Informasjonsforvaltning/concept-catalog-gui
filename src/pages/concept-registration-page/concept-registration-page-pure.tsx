import React, { useEffect } from 'react';
import get from 'lodash/get';

import { useDispatch, useGlobalState } from '../../app/context/stateContext';
import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept';
import { conceptPatchSuccessAction } from '../../app/reducers/stateReducer';
import { Concept } from '../../types';

import Root from '../../components/root';

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
    <Root>
      <SC.Container>
        {globalStateValues && (
          <FormConcept
            concept={copyOfConcept}
            dispatch={dispatch}
            lastPatchedResponse={get(globalStateValues, 'lastPatchedResponse')}
            isSaving={globalStateValues.isSaving}
          />
        )}
      </SC.Container>
    </Root>
  );
};
