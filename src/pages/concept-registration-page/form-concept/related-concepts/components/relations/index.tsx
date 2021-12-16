import React, { FC, memo, useEffect } from 'react';
import { FieldArray, useField } from 'formik';

import { Language, Relasjon } from '../../../../../../types';
import { localization } from '../../../../../../lib/localization';
import { Can } from '../../../../../../casl/Can';
import { isConceptEditable } from '../../../../../../lib/concept';
import {
  useAppSelector,
  useAppDispatch
} from '../../../../../../app/redux/hooks';
import { fetchConcepts } from '../../../../../../features/concepts';

import { ButtonSource } from '../../../../../../components/button-source/button-source.component';
import { OptionProps } from '../../../../../../components/fields/field-select/field-select.component';
import RelationItem from '../relation';
import SC from './styled';

const getRelations = form => form?.values?.begrepsRelasjon ?? [];

const handleAddRelation = (push: any) => {
  push({} as Relasjon);
};

const handleRemoveRelation = (form, index) => {
  const { begrepsRelasjon } = form.values;
  if (Array.isArray(begrepsRelasjon)) {
    const removeElement = begrepsRelasjon?.[index];
    const updated = begrepsRelasjon?.filter(v => v !== removeElement);
    form.setFieldValue('begrepsRelasjon', updated);
  }
};

interface Props {
  catalogId: string;
  languages: Language[];
  isReadOnly: boolean;
  conceptSuggestionsMap?: OptionProps[];
  executeConceptSuggestionSearch: (query: string, publisherId?: string) => void;
}

const Relations: FC<Props> = ({
  catalogId,
  languages,
  isReadOnly,
  conceptSuggestionsMap,
  executeConceptSuggestionSearch
}) => {
  const [field] = useField('begrepsRelasjon');
  const conceptForm = useAppSelector(state => state.conceptForm);

  const relations = field.value ?? [];
  const dispatch = useAppDispatch();
  const idS = relations.map(s => s.relatertBegrep).filter(Boolean);

  useEffect(() => {
    if (idS?.length > 0) {
      dispatch(fetchConcepts(idS));
    }
  }, []);

  return (
    <SC.Relations>
      {relations && (
        <FieldArray
          name='begrepsRelasjon'
          render={({ form, push }) => (
            <div>
              {getRelations(form).map((relation, index) => (
                <SC.Relation>
                  <RelationItem
                    index={index}
                    relation={relation}
                    catalogId={catalogId}
                    languages={languages}
                    isReadOnly={isReadOnly}
                    conceptSuggestionsMap={conceptSuggestionsMap}
                    executeConceptSuggestionSearch={
                      executeConceptSuggestionSearch
                    }
                  />
                  <div className='form-group d-flex justify-content-end'>
                    <Can
                      I='edit'
                      of={{ __type: 'Field', publisher: catalogId }}
                    >
                      {isConceptEditable(conceptForm.concept) && (
                        <ButtonSource
                          remove
                          title={localization.removeRelation}
                          handleClick={() => handleRemoveRelation(form, index)}
                        />
                      )}
                    </Can>
                  </div>
                </SC.Relation>
              ))}
              <Can I='edit' of={{ __type: 'Field', publisher: catalogId }}>
                {isConceptEditable(conceptForm.concept) && (
                  <SC.AddButton
                    title={localization.addRelation}
                    onClick={() => handleAddRelation(push)}
                  >
                    <SC.AddIcon />
                    {localization.addRelation}
                  </SC.AddButton>
                )}
              </Can>
            </div>
          )}
        />
      )}
    </SC.Relations>
  );
};

export default memo(Relations);
