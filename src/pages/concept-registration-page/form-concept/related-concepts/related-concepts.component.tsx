import React, { FC, useEffect } from 'react';
import { compose } from '@reduxjs/toolkit';
import {
  FieldArray,
  useFormikContext,
  FormikValues,
  Field,
  useField
} from 'formik';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { localization } from '../../../../lib/localization';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import {
  fetchConcepts,
  selectAllConceptEntities
} from '../../../../features/concepts';

import {
  OptionProps,
  SelectField
} from '../../../../components/fields/field-select/field-select.component';
import {
  fetchConceptSuggestions,
  selectAllConceptSuggestions
} from '../../../../features/concept-suggestions';
import { getTranslateText } from '../../../../lib/translateText';

interface RouteParams {
  catalogId: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

const RelatedConceptsPure: FC<Props> = () => {
  const [field] = useField('seOgså');
  const dispatch = useAppDispatch();
  const relatedConcepts = useAppSelector(selectAllConceptEntities);
  const conceptSuggestions = useAppSelector(selectAllConceptSuggestions);

  const formik: FormikValues = useFormikContext();
  const seOgsaaField = formik?.values?.seOgså;

  useEffect(() => {
    if (seOgsaaField?.length > 0) {
      dispatch(fetchConcepts(seOgsaaField));
    }
  }, [seOgsaaField]);

  const executeConceptSuggestionSearch = (q: string) => {
    dispatch(fetchConceptSuggestions(q));
  };

  useEffect(() => {
    executeConceptSuggestionSearch('');
  }, []);

  const addRelatedConcept = (form, fieldName, option): void => {
    form.setFieldValue(
      fieldName,
      option.map(item => item.value)
    );
    option?.value && dispatch(fetchConcepts([option.value]));
  };

  const conceptSuggestionsMap = conceptSuggestions.map(
    ({ identifier, prefLabel, definition, publisher }) =>
      ({
        value: identifier,
        label: getTranslateText(prefLabel),
        description: getTranslateText(definition?.text),
        publisher:
          getTranslateText(publisher?.prefLabel) ?? publisher?.name ?? ''
      } as OptionProps)
  );

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
            <Field
              name={field.name}
              component={SelectField}
              label={localization.relatedConcept}
              showLabel
              placeHolder={localization.searchConcepts}
              showCustomOption
              options={conceptSuggestionsMap}
              onClear={() => form.setFieldValue(field.name, '')}
              onChange={addRelatedConcept}
              onInputChange={executeConceptSuggestionSearch}
              defaultValue={form?.values?.seOgså.map(item => ({
                value: item,
                label:
                  getTranslateText(relatedConcepts[item]?.prefLabel) ??
                  'default'
              }))}
              isMulti
            />
          )}
        />
      </div>
    </div>
  );
};

export const RelatedConcepts = compose<FC>(withRouter)(RelatedConceptsPure);
