import React, { FC, memo, useEffect, useState } from 'react';
import { Field, useField } from 'formik';

import { Relation, RelationType } from '../../../../../../types/enums';
import { Language } from '../../../../../../types';
import { InputField } from '../../../../../../components/fields/field-input/field-input.component';
import { localization } from '../../../../../../lib/localization';
import { getTranslateText } from '../../../../../../lib/translateText';
import {
  useAppSelector,
  useAppDispatch
} from '../../../../../../app/redux/hooks';
import {
  fetchConcepts,
  fetchInternalConcepts,
  selectAllConceptEntities,
  selectAllInternalConceptEntities
} from '../../../../../../features/concepts';
import {
  SelectField,
  OptionProps
} from '../../../../../../components/fields/field-select/field-select.component';
import { HelpText } from '../../../../../../components/help-text/help-text.component';
import { MultilingualField } from '../../../../../../components/multilingual-field/multilingual-field.component';

import SC from './styled';

const relationOptions = [
  { value: Relation.ASSOSIATIV, label: localization.associative },
  { value: Relation.PARTITIV, label: localization.partitive },
  { value: Relation.GENERISK, label: localization.generic }
];

const relationTypeOptions = [
  {
    value: RelationType.OVERORDNET,
    label: localization.overall,
    filterByParent: Relation.GENERISK
  },
  {
    value: RelationType.UNDERORDNET,
    label: localization.subordinate,
    filterByParent: Relation.GENERISK
  },
  {
    value: RelationType.ER_DEL_AV,
    label: localization.partOf,
    filterByParent: Relation.PARTITIV
  },
  {
    value: RelationType.OMFATTER,
    label: localization.includes,
    filterByParent: Relation.PARTITIV
  }
];

interface Props {
  index: number;
  relation: any;
  catalogId: string;
  languages: Language[];
  isReadOnly: boolean;
  conceptSuggestionsMap?: OptionProps[];
  executeConceptSuggestionSearch?: (
    query: string,
    publisherId?: string
  ) => void;
  executeInternalConceptSuggestionSearch?: (
    query: string,
    publisherId: string
  ) => void;
  fieldName: 'begrepsRelasjon' | 'internBegrepsRelasjon';
}

const RelationItem: FC<Props> = ({
  index,
  fieldName,
  relation,
  catalogId,
  languages,
  isReadOnly,
  conceptSuggestionsMap,
  executeConceptSuggestionSearch,
  executeInternalConceptSuggestionSearch
}) => {
  const [filterSuggestionsByCatalogId, setFilterSuggestionsByCatalogId] =
    useState<boolean>(false);
  const [fieldValue] = useField(fieldName);
  const relatedConcepts = useAppSelector(selectAllConceptEntities);
  const relatedInternalConcepts = useAppSelector(
    selectAllInternalConceptEntities
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      relation.relasjonsType === RelationType.OVERORDNET ||
      relation.relasjonsType === RelationType.ER_DEL_AV
    ) {
      setFilterSuggestionsByCatalogId(true);
    }
  }, []);

  const addRelatedConcept = (form, field, option): void => {
    form.setFieldValue(field, option?.value ?? null);
    const values = [option.value];
    option?.value && fieldName === 'begrepsRelasjon'
      ? dispatch(fetchConcepts(values))
      : dispatch(fetchInternalConcepts({ catalogId, values }));
  };

  const clearTypeRelatedFields = form => {
    form.setFieldValue(`${fieldName}[${index}].relasjonsType`);
    form.setFieldValue(
      `${fieldName}[${index}].beskrivelse`,
      { nb: '', nn: '', en: '' },
      false
    );
    form.setFieldValue(
      `${fieldName}[${index}].inndelingskriterium`,
      { nb: '', nn: '', en: '' },
      false
    );
  };

  const handleChangeOptionValue = (form, field, option) => {
    if (
      option?.value === RelationType.OVERORDNET ||
      option?.value === RelationType.OMFATTER
    ) {
      setFilterSuggestionsByCatalogId(true);
      form.setFieldValue(`${fieldName}[${index}].relatertBegrep`, null, false);
    } else {
      setFilterSuggestionsByCatalogId(false);
    }
    form.setFieldValue(field, option?.value ?? null);
  };

  const getLabel = () =>
    fieldName === 'begrepsRelasjon'
      ? getTranslateText(
          relatedConcepts[fieldValue.value[index].relatertBegrep]?.title
        ) || 'default'
      : getTranslateText(
          relatedInternalConcepts[fieldValue.value[index].relatertBegrep]
            ?.anbefaltTerm?.navn
        ) || 'default';

  return (
    <>
      <SC.SelectButtons>
        <Field
          name={`${fieldName}[${index}].relasjon`}
          component={SelectField}
          label={localization.relation}
          showLabel
          showRequired
          options={relationOptions}
          onClear={form => {
            form.setFieldValue(`${fieldName}[${index}].relasjon`, null);
            form.setFieldValue(`${fieldName}[${index}].relasjonsType`, null);
          }}
          onChange={(form, field, option) => {
            clearTypeRelatedFields(form);
            handleChangeOptionValue(form, field, option);
          }}
          defaultValue={relationOptions.find(
            option => option.value === fieldValue.value[index].relasjon
          )}
        />
        {(relation.relasjon === Relation.PARTITIV ||
          relation.relasjon === Relation.GENERISK) && (
          <Field
            name={`${fieldName}[${index}].relasjonsType`}
            component={SelectField}
            label={localization.relationType}
            showLabel
            showRequired
            options={relationTypeOptions.filter(
              option => option.filterByParent === relation.relasjon
            )}
            onClear={form =>
              form.setFieldValue(`${fieldName}[${index}].relasjonsType`, null)
            }
            onChange={(form, field, option) => {
              handleChangeOptionValue(form, field, option);
            }}
            defaultValue={relationTypeOptions.find(
              option => option.value === fieldValue.value[index].relasjonsType
            )}
          />
        )}
      </SC.SelectButtons>
      {relation.relasjon === Relation.ASSOSIATIV && (
        <div className='form-group'>
          <HelpText
            title={localization.descriptionTitle}
            showRequired={!isReadOnly}
          />
          <MultilingualField
            name={`${fieldName}[${index}].beskrivelse`}
            component={InputField}
            label={`${fieldName}[${index}].beskrivelse`}
            languages={languages}
          />
        </div>
      )}
      {(relation.relasjon === Relation.PARTITIV ||
        relation.relasjon === Relation.GENERISK) && (
        <div className='form-group'>
          <HelpText title={localization.inndelingskriteriumTitle} />
          <MultilingualField
            name={`${fieldName}[${index}].inndelingskriterium`}
            component={InputField}
            label={`${fieldName}[${index}].inndelingskriterium`}
            languages={languages}
          />
        </div>
      )}
      <div className='form-group'>
        <Field
          name={`${fieldName}[${index}].relatertBegrep`}
          component={SelectField}
          placeholder={localization.searchConcepts}
          label={localization.relatedConcept}
          showLabel
          showRequired
          showCustomOption
          options={conceptSuggestionsMap}
          onClear={form =>
            form.setFieldValue(`${fieldName}[${index}].relatertBegrep`, '')
          }
          onChange={addRelatedConcept}
          onInputChange={query => {
            if (fieldName === 'begrepsRelasjon') {
              if (filterSuggestionsByCatalogId) {
                executeConceptSuggestionSearch &&
                  executeConceptSuggestionSearch(query, catalogId);
              } else {
                executeConceptSuggestionSearch &&
                  executeConceptSuggestionSearch(query);
              }
            } else {
              executeInternalConceptSuggestionSearch &&
                executeInternalConceptSuggestionSearch(query, catalogId);
            }
          }}
          defaultValue={
            fieldValue.value[index].relatertBegrep && {
              value: fieldValue.value[index].relatertBegrep,
              label: getLabel()
            }
          }
        />
      </div>
    </>
  );
};

export default memo(RelationItem);
