import React, { FC, useEffect } from 'react';
import { Field, FieldArray, useField } from 'formik';
import { localization } from '../../../../lib/localization';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { DatePickerField } from '../../../../components/fields/field-datepicker/field-datepicker.component';
import {
  OptionProps,
  SelectField
} from '../../../../components/fields/field-select/field-select.component';
import { getTranslateText } from '../../../../lib/translateText';
import { useAppDispatch, useAppSelector } from '../../../../app/redux/hooks';
import {
  fetchConceptSuggestions,
  fetchInternalConceptSuggestions,
  selectAllConceptSuggestions,
  selectAllInternalConceptSuggestions
} from '../../../../features/concept-suggestions';
import {
  fetchConcepts,
  fetchInternalConcepts,
  selectAllConceptEntities,
  selectAllInternalConceptEntities
} from '../../../../features/concepts';

interface Props {
  catalogId: string;
}

export const Validity: FC<Props> = ({ catalogId }) => {
  const [gyldigFomField] = useField('gyldigFom');
  const [gyldigTomField] = useField('gyldigTom');
  const [erstattesAv] = useField('erstattesAv');
  const [internErstattesAv] = useField('internErstattesAv');
  const dispatch = useAppDispatch();
  const relatedConcepts = useAppSelector(selectAllConceptEntities);
  const conceptSuggestions = useAppSelector(selectAllConceptSuggestions);
  const relatedInternalConcepts = useAppSelector(
    selectAllInternalConceptEntities
  );

  useEffect(() => {
    if (erstattesAv.value?.length > 0) {
      dispatch(fetchConcepts(erstattesAv.value));
    }
  }, [erstattesAv.value]);

  const executeConceptSuggestionSearch = (q: string) => {
    dispatch(fetchConceptSuggestions({ q }));
  };

  const executeInternalConceptSuggestionSearch = (
    query: string,
    publisherId: string
  ) => {
    dispatch(fetchInternalConceptSuggestions({ query, publisherId }));
  };

  useEffect(() => {
    executeConceptSuggestionSearch('');
    executeInternalConceptSuggestionSearch('', catalogId);
  }, []);

  useEffect(() => {
    if (internErstattesAv.value?.length > 0) {
      dispatch(
        fetchInternalConcepts({
          catalogId,
          values: internErstattesAv.value
        })
      );
    }
  }, [internErstattesAv.value]);

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

  const internalConceptSuggestions = useAppSelector(
    selectAllInternalConceptSuggestions
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
        <HelpText
          title={localization.gyldigFomTitle}
          helpTextAbstract={localization.gyldigFomAbstract}
          helpTextDescription={localization.gyldigFomDescription}
        />
        <Field
          name='gyldigFom'
          component={DatePickerField}
          label='gyldigFom'
          maxDate={gyldigTomField.value}
        />
      </div>
      <div className='form-group'>
        <HelpText
          title={localization.gyldigTomTitle}
          helpTextAbstract={localization.gyldigTomAbstract}
          helpTextDescription={localization.gyldigTomDescription}
        />
        <Field
          name='gyldigTom'
          component={DatePickerField}
          label='gyldigTom'
          minDate={gyldigFomField.value}
        />
      </div>
      <div className='form-group'>
        <HelpText
          title={localization.replacedBy}
          helpTextAbstract={localization.replacedByAbstract}
        />
        <FieldArray
          name='erstattesAv'
          render={({ form }) => (
            <Field
              name={erstattesAv.name}
              component={SelectField}
              placeholder={localization.searchConcepts}
              showCustomOption
              options={conceptSuggestionsMap}
              onClear={() => form.setFieldValue(erstattesAv.name, '')}
              onChange={addRelatedConcept}
              onInputChange={executeConceptSuggestionSearch}
              defaultValue={form?.values?.erstattesAv?.map(item => ({
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
          title={localization.replacedByNotPublished}
          helpTextAbstract={localization.replacedByUnpublishedAbstract}
        />
        <FieldArray
          name='internErstattesAv'
          render={({ form }) => (
            <Field
              name={internErstattesAv.name}
              component={SelectField}
              placeholder={localization.searchUnpublishedConcepts}
              showCustomOption
              options={internalConceptSuggestionsMap}
              onClear={() => form.setFieldValue(internErstattesAv.name, '')}
              onChange={addRelatedInternalConcept}
              onInputChange={value =>
                executeInternalConceptSuggestionSearch(value, catalogId)
              }
              defaultValue={form?.values?.internErstattesAv?.map(item => ({
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
