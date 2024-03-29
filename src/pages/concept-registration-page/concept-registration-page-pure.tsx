import React, { FC, useEffect, useState } from 'react';
import { compose } from '@reduxjs/toolkit';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Concept } from '../../types';

import './concept-registration-page-pure.scss';
import { FormConcept } from './form-concept';

import { useAppSelector, useAppDispatch } from '../../app/redux/hooks';
import {
  fetchConceptById,
  setConcept,
  resetConceptForm
} from '../../features/conceptForm';

import Root from '../../components/root';

import SC from './styled';

interface RouteParams {
  catalogId: string;
  conceptId: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

const createConcept = catalogId =>
  ({
    anbefaltTerm: {
      navn: {}
    },
    statusURI:
      'http://publications.europa.eu/resource/authority/concept-status/DRAFT',
    ansvarligVirksomhet: {
      id: catalogId
    },
    versjonsnr: { major: 0, minor: 1, patch: 0 }
  } as Concept);

const ConceptRegistrationPagePure: FC<Props> = ({
  match: {
    params: { catalogId, conceptId }
  }
}) => {
  const [initialConcept, setInitialConcept] = useState<Concept>();

  const dispatch = useAppDispatch();

  const conceptForm = useAppSelector(state => state.conceptForm);
  const { concept, isSaving } = conceptForm;

  useEffect(() => {
    if (conceptId !== 'new') {
      dispatch(fetchConceptById(conceptId)).then(action => {
        const fetchedConcept: any = action.payload;
        setInitialConcept(fetchedConcept);
      });
    } else {
      const newConcept = createConcept(catalogId);
      setInitialConcept(newConcept);
      dispatch(setConcept(newConcept));
    }

    return () => {
      setInitialConcept(undefined);
      dispatch(resetConceptForm());
    };
  }, [conceptId]);

  return (
    <Root>
      <SC.Container>
        {initialConcept && (
          <FormConcept
            concept={initialConcept}
            dispatch={dispatch}
            lastPatchedResponse={concept}
            isSaving={isSaving}
          />
        )}
      </SC.Container>
    </Root>
  );
};

export default compose<FC<Props>>(withRouter)(ConceptRegistrationPagePure);
