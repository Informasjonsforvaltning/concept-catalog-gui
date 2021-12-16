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
  selectAllConceptEntities
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
  executeConceptSuggestionSearch: (query: string, publisherId?: string) => void;
}

const RelationItem: FC<Props> = ({
  index,
  relation,
  catalogId,
  languages,
  isReadOnly,
  conceptSuggestionsMap,
  executeConceptSuggestionSearch
}) => {
  const [filterSuggestionsByCatalogId, setFilterSuggestionsByCatalogId] =
    useState<boolean>(false);
  const [field] = useField('begrepsRelasjon');
  const relatedConcepts = useAppSelector(selectAllConceptEntities);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      relation.relasjonsType === RelationType.OVERORDNET ||
      relation.relasjonsType === RelationType.ER_DEL_AV
    ) {
      setFilterSuggestionsByCatalogId(true);
    }
  }, []);

  const addRelatedConcept = (form, fieldName, option): void => {
    form.setFieldValue(fieldName, option?.value ?? null);
    option?.value && dispatch(fetchConcepts([option.value]));
  };

  const clearTypeRelatedFields = form => {
    form.setFieldValue(`begrepsRelasjon[${index}].relasjonsType`);
    form.setFieldValue(
      `begrepsRelasjon[${index}].beskrivelse`,
      { nb: '', nn: '', en: '' },
      false
    );
    form.setFieldValue(
      `begrepsRelasjon[${index}].inndelingskriterium`,
      { nb: '', nn: '', en: '' },
      false
    );
  };

  const handleChangeOptionValue = (form, fieldName, option) => {
    if (
      option?.value === RelationType.OVERORDNET ||
      option?.value === RelationType.ER_DEL_AV
    ) {
      setFilterSuggestionsByCatalogId(true);
      form.setFieldValue(
        `begrepsRelasjon[${index}].relatertBegrep`,
        null,
        false
      );
    } else {
      setFilterSuggestionsByCatalogId(false);
    }
    form.setFieldValue(fieldName, option?.value ?? null);
  };

  return (
    <>
      <SC.SelectButtons>
        <Field
          name={`begrepsRelasjon[${index}].relasjon`}
          component={SelectField}
          label={localization.relation}
          showLabel
          showRequired
          options={relationOptions}
          onClear={form => {
            form.setFieldValue(`begrepsRelasjon[${index}].relasjon`, null);
            form.setFieldValue(`begrepsRelasjon[${index}].relasjonsType`, null);
          }}
          onChange={(form, fieldName, option) => {
            clearTypeRelatedFields(form);
            handleChangeOptionValue(form, fieldName, option);
          }}
          defaultValue={relationOptions.find(
            option => option.value === field.value[index].relasjon
          )}
        />
        {(relation.relasjon === Relation.PARTITIV ||
          relation.relasjon === Relation.GENERISK) && (
          <Field
            name={`begrepsRelasjon[${index}].relasjonsType`}
            component={SelectField}
            label={localization.relationType}
            showLabel
            showRequired
            options={relationTypeOptions.filter(
              option => option.filterByParent === relation.relasjon
            )}
            onClear={form =>
              form.setFieldValue(
                `begrepsRelasjon[${index}].relasjonsType`,
                null
              )
            }
            onChange={(form, fieldName, option) => {
              handleChangeOptionValue(form, fieldName, option);
            }}
            defaultValue={relationTypeOptions.find(
              option => option.value === field.value[index].relasjonsType
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
            name={`begrepsRelasjon[${index}].beskrivelse`}
            component={InputField}
            label={`begrepsRelasjon[${index}].beskrivelse`}
            languages={languages}
          />
        </div>
      )}
      {(relation.relasjon === Relation.PARTITIV ||
        relation.relasjon === Relation.GENERISK) && (
        <div className='form-group'>
          <HelpText title={localization.inndelingskriteriumTitle} />
          <MultilingualField
            name={`begrepsRelasjon[${index}].inndelingskriterium`}
            component={InputField}
            label={`begrepsRelasjon[${index}].inndelingskriterium`}
            languages={languages}
          />
        </div>
      )}
      <div className='form-group'>
        <Field
          name={`begrepsRelasjon[${index}].relatertBegrep`}
          component={SelectField}
          placeHolder={localization.searchConcepts}
          label={localization.relatedConcept}
          showLabel
          showRequired
          showCustomOption
          options={conceptSuggestionsMap}
          onClear={form =>
            form.setFieldValue(`begrepsRelasjon[${index}].relatertBegrep`, '')
          }
          onChange={addRelatedConcept}
          onInputChange={query =>
            filterSuggestionsByCatalogId
              ? executeConceptSuggestionSearch(query, catalogId)
              : executeConceptSuggestionSearch(query)
          }
          defaultValue={
            field.value[index].relatertBegrep && {
              value: field.value[index].relatertBegrep,
              label: getTranslateText(
                relatedConcepts[field.value[index].relatertBegrep]?.prefLabel
              )
            }
          }
        />
      </div>
    </>
  );
};

export default memo(RelationItem);
