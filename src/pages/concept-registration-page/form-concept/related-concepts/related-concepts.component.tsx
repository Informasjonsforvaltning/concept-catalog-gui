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

import { Language } from '../../../../types';
import { localization } from '../../../../lib/localization';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import {
  fetchConcepts,
  fetchInternalConcepts,
  selectAllConceptEntities,
  selectAllInternalConceptEntities
} from '../../../../features/concepts';
import {
  OptionProps,
  SelectField
} from '../../../../components/fields/field-select/field-select.component';
import {
  fetchConceptSuggestions,
  fetchInternalConceptSuggestions,
  selectAllConceptSuggestions,
  selectAllInternalConceptSuggestions
} from '../../../../features/concept-suggestions';
import { getTranslateText } from '../../../../lib/translateText';
import Relations from './components/relations';

interface RouteParams {
  catalogId: string;
}

interface ExternalProps {
  languages: Language[];
  isReadOnly: boolean;
}

interface Props extends ExternalProps, RouteComponentProps<RouteParams> {}

const RelatedConceptsPure: FC<Props> = ({
  languages,
  isReadOnly,
  match: {
    params: { catalogId }
  }
}) => {
  const [field] = useField('seOgså');
  const dispatch = useAppDispatch();
  const relatedConcepts = useAppSelector(selectAllConceptEntities);
  const relatedInternalConcepts = useAppSelector(
    selectAllInternalConceptEntities
  );
  const conceptSuggestions = useAppSelector(selectAllConceptSuggestions);
  const internalConceptSuggestions = useAppSelector(
    selectAllInternalConceptSuggestions
  );

  const formik: FormikValues = useFormikContext();
  const seOgsaaField = formik?.values?.seOgså;
  const internSeOgsaaField = formik?.values?.internSeOgså;

  useEffect(() => {
    if (seOgsaaField?.length > 0) {
      dispatch(fetchConcepts(seOgsaaField));
    }
  }, [seOgsaaField]);

  useEffect(() => {
    if (internSeOgsaaField?.length > 0) {
      dispatch(
        fetchInternalConcepts({
          catalogId,
          values: internSeOgsaaField
        })
      );
    }
  }, [seOgsaaField]);

  const executeConceptSuggestionSearch = (q: string, publisherId?: string) => {
    dispatch(fetchConceptSuggestions({ q, publisherId }));
  };

  const executeInternalConceptSuggestionSearch = (
    q: string,
    publisherId: string
  ) => {
    dispatch(fetchInternalConceptSuggestions({ q, publisherId }));
  };

  useEffect(() => {
    executeConceptSuggestionSearch('');
    executeInternalConceptSuggestionSearch('', catalogId);
  }, []);

  const addRelatedConcept = (form, fieldName, option): void => {
    form.setFieldValue(
      fieldName,
      option.map(item => item.value)
    );
    option?.value && dispatch(fetchConcepts([option.value]));
  };

  const extractListOfOriginaltBegrepIds = (values: OptionProps[]): string[] => {
    const originaltBegreps: string[] = [];

    values &&
      values.forEach(value => {
        const originaltBegrep = value.value;
        originaltBegrep && originaltBegreps.push(originaltBegrep);
      });
    return originaltBegreps;
  };

  const addRelatedInternalConcept = (form, fieldName, option): void => {
    form.setFieldValue(
      fieldName,
      option.map(item => item.value)
    );
    const values = extractListOfOriginaltBegrepIds(option);
    option?.values && dispatch(fetchInternalConcepts({ catalogId, values }));
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

  const internalConceptSuggestionsMap = internalConceptSuggestions.map(
    ({ anbefaltTerm, definisjon, originaltBegrep }) =>
      ({
        value: originaltBegrep,
        label: getTranslateText(anbefaltTerm?.navn),
        description: getTranslateText(definisjon?.tekst)
      } as any)
  );

  return (
    <div>
      <div className='form-group'>
        <HelpText title={localization.relationsTitle} />
        <Relations
          catalogId={catalogId}
          languages={languages}
          isReadOnly={isReadOnly}
          conceptSuggestionsMap={conceptSuggestionsMap}
          executeConceptSuggestionSearch={executeConceptSuggestionSearch}
        />

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
              placeholder={localization.searchConcepts}
              showCustomOption
              options={conceptSuggestionsMap}
              onClear={() => form.setFieldValue(field.name, '')}
              onChange={addRelatedConcept}
              onInputChange={value => executeConceptSuggestionSearch(value)}
              defaultValue={form?.values?.seOgså?.map(item => ({
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
      <div className='form-group'>
        <HelpText
          title={localization.seeAlsoUnpublished}
          helpTextAbstract={localization.seOgsaaUpublisertAbstract}
        />
        <FieldArray
          name='internSeOgså'
          render={({ form }) => (
            <Field
              name='internSeOgså'
              component={SelectField}
              placeholder={localization.searchUnpublishedConcepts}
              showCustomOption
              options={internalConceptSuggestionsMap}
              onClear={() => form.setFieldValue('internSeOgså', '')}
              onChange={addRelatedInternalConcept}
              onInputChange={value =>
                executeInternalConceptSuggestionSearch(value, catalogId)
              }
              defaultValue={form?.values?.internSeOgså?.map(item => ({
                value: item,
                label:
                  getTranslateText(
                    relatedInternalConcepts[item]?.anbefaltTerm?.navn
                  ) ?? 'default'
              }))}
              isMulti
            />
          )}
        />
      </div>
    </div>
  );
};

export const RelatedConcepts =
  compose<FC<ExternalProps>>(withRouter)(RelatedConceptsPure);
