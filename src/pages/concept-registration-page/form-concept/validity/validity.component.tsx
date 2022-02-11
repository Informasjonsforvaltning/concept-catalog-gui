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
  selectAllConceptSuggestions
} from '../../../../features/concept-suggestions';
import {
  fetchConcepts,
  selectAllConceptEntities
} from '../../../../features/concepts';

export const Validity: FC = () => {
  const [gyldigFomField] = useField('gyldigFom');
  const [gyldigTomField] = useField('gyldigTom');
  const [erstattesAv] = useField('erstattesAv');
  const dispatch = useAppDispatch();
  const relatedConcepts = useAppSelector(selectAllConceptEntities);
  const conceptSuggestions = useAppSelector(selectAllConceptSuggestions);

  useEffect(() => {
    if (erstattesAv.value?.length > 0) {
      dispatch(fetchConcepts(erstattesAv.value));
    }
  }, [erstattesAv.value]);

  const executeConceptSuggestionSearch = (q: string) => {
    dispatch(fetchConceptSuggestions({ q }));
  };

  useEffect(() => {
    executeConceptSuggestionSearch('');
  }, []);

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
              placeHolder={localization.searchConcepts}
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
    </div>
  );
};
