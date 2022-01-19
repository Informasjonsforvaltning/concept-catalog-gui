import React, { FC, useEffect } from 'react';
import { compose } from '@reduxjs/toolkit';
import { FieldArray, useFormikContext, FormikValues } from 'formik';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { localization } from '../../../../lib/localization';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { Can } from '../../../../casl/Can';
import { AutosuggestConcepts } from '../../../../components/autosuggest-concepts/autosuggest-concepts.component';
import { getTranslateText } from '../../../../lib/translateText';
import { isConceptEditable } from '../../../../lib/concept';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import {
  fetchConcepts,
  selectAllConceptEntities
} from '../../../../features/concepts';

interface Suggestion {
  identifier: string;
}

const addSeeAlso = (suggestion: Suggestion, form): void => {
  const seeAlsoValues: string[] = form.values.seOgså;
  form.setFieldValue('seOgså', [...seeAlsoValues, suggestion.identifier]);
};

const removeSeeAlso = (identifier: string, form): void => {
  const seeAlsoValues: string[] = form.values.seOgså;
  const filteredValues = seeAlsoValues.filter(el => el !== identifier);
  form.setFieldValue('seOgså', filteredValues);
};

interface RouteParams {
  catalogId: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

const RelatedConceptsPure: FC<Props> = ({
  match: {
    params: { catalogId }
  }
}) => {
  const dispatch = useAppDispatch();
  const conceptForm = useAppSelector(state => state.conceptForm);
  const relatedConcepts = useAppSelector(selectAllConceptEntities);

  const formik: FormikValues = useFormikContext();
  const seOgsaaField = formik?.values?.seOgså;

  useEffect(() => {
    if (seOgsaaField?.length > 0) {
      dispatch(fetchConcepts(seOgsaaField));
    }
  }, [seOgsaaField]);

  return (
    <div>
      <div className='form-group'>
        <HelpText
          title={localization.seeAlso}
          helpTextAbstract={localization.seOgsaaAbstract}
        />

        <FieldArray
          name='seOgså'
          render={({ form }) => (
            <>
              <Can I='edit' of={{ __type: 'Field', publisher: catalogId }}>
                {isConceptEditable(conceptForm.concept) && (
                  <AutosuggestConcepts
                    onAddSuggestion={(suggestion: Suggestion) =>
                      addSeeAlso(suggestion, form)
                    }
                  />
                )}
              </Can>
              <div className='pl-2'>
                {seOgsaaField.map((identifier, index) => (
                  <div
                    key={`${identifier}-${index}`}
                    className='badge badge-dark mt-3 mr-3 p-3'
                  >
                    <span>
                      {getTranslateText(relatedConcepts[identifier]?.prefLabel)}
                    </span>
                    <Can
                      I='edit'
                      of={{ __type: 'Field', publisher: catalogId }}
                    >
                      {isConceptEditable(conceptForm.concept) && (
                        <button
                          type='button'
                          className='fdk-btn-no-border'
                          onClick={() => removeSeeAlso(identifier, form)}
                        >
                          <i className='fa fa-times-circle ml-2 fdk-color-white' />
                        </button>
                      )}
                    </Can>
                  </div>
                ))}
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
};

export const RelatedConcepts = compose<FC>(withRouter)(RelatedConceptsPure);
