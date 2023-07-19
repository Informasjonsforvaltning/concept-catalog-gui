import React, { FC } from 'react';
import { Field, FieldArray, useField } from 'formik';
import { v4 } from 'uuid';
import _ from 'lodash';

import { isConceptEditable } from '../../../../../lib/concept';
import { localization } from '../../../../../lib/localization';
import { InputField } from '../../../../../components/fields/field-input/field-input.component';
import { ButtonSource } from '../../../../../components/button-source/button-source.component';
import {
  OptionProps,
  SelectField
} from '../../../../../components/fields/field-select/field-select.component';
import './source.scss';
import { Can } from '../../../../../casl/Can';
import { useAppSelector } from '../../../../../app/redux/hooks';

const options = [
  { value: 'egendefinert', label: localization.custom },
  { value: 'basertPaaKilde', label: localization.basedOnSource },
  { value: 'sitatFraKilde', label: localization.quoteFromSource }
] as OptionProps[];

const handleClearKildebeskrivelse = (form, fieldName) => {
  form.setFieldValue(`${fieldName}.kildebeskrivelse`, null);
};

const handleChangeForholdTilKilde = (form, fieldName, option) => {
  if (option?.value) {
    form.setFieldValue(`${fieldName}.kildebeskrivelse`, {
      forholdTilKilde: option.value,
      kilde:
        option.value === 'egendefinert'
          ? []
          : form.values[fieldName]?.kildebeskrivelse?.kilde ?? []
    });
  }
};

const handleAddKilde = (push: any) => {
  push({ id: v4(), tekst: '', uri: '' });
};

const handleRemoveKilde = (form, fieldName, index) => {
  const { kildebeskrivelse } = form.values[fieldName] ?? {};
  if (Array.isArray(kildebeskrivelse?.kilde)) {
    const removeElement = kildebeskrivelse?.kilde?.[index];
    const newSource = kildebeskrivelse?.kilde?.filter(v => v !== removeElement);
    form.setFieldValue(`${fieldName}.kildebeskrivelse`, {
      ...kildebeskrivelse,
      kilde: newSource ?? []
    });
  }
};

const getKilde = (form, fieldName) =>
  _.get(form, ['values', fieldName, 'kildebeskrivelse', 'kilde'], []);

interface Props {
  catalogId: string;
  fieldName: string;
}
export const SourcePure: FC<Props> = ({ catalogId, fieldName }) => {
  const [field] = useField(`${fieldName}.kildebeskrivelse`);
  const forholdTilKilde = _.get(field, ['value', 'forholdTilKilde']);

  const conceptForm = useAppSelector(state => state.conceptForm);

  return (
    <div>
      <div className='row d-flex'>
        <div className='col-sm-5 mb-4'>
          <Field
            className='col-sm-5'
            name={`${fieldName}.kildebeskrivelse.forholdTilKilde`}
            component={SelectField}
            label={localization.relationToSource}
            showLabel
            options={options}
            defaultValue={options.find(
              option => option.value === forholdTilKilde
            )}
            onClear={form => handleClearKildebeskrivelse(form, fieldName)}
            onChange={(form, _thisFieldName, option) =>
              handleChangeForholdTilKilde(form, fieldName, option)
            }
          />
        </div>
        <div className='col-sm-7' />
      </div>
      {forholdTilKilde && forholdTilKilde !== 'egendefinert' && (
        <FieldArray
          name={`${fieldName}.kildebeskrivelse.kilde`}
          render={({ form, push }) => (
            <div>
              {getKilde(form, fieldName)?.map((kilde, index) => (
                <div key={`${kilde.id}-${index}`} className='row d-flex mb-4'>
                  <div className='col-sm-5'>
                    <Field
                      name={`${fieldName}.kildebeskrivelse.kilde[${index}].tekst`}
                      component={InputField}
                      label={localization.titleSource}
                      showLabel
                    />
                  </div>

                  <div className='col-sm-5'>
                    <Field
                      name={`${fieldName}.kildebeskrivelse.kilde[${index}].uri`}
                      component={InputField}
                      label={localization.linkSource}
                      showLabel
                    />
                  </div>

                  <div className='fdk-source col-sm-2'>
                    <Can
                      I='edit'
                      of={{ __type: 'Field', publisher: catalogId }}
                    >
                      {isConceptEditable(conceptForm.concept) && (
                        <ButtonSource
                          remove
                          title={localization.removeSource}
                          handleClick={() =>
                            handleRemoveKilde(form, fieldName, index)
                          }
                        />
                      )}
                    </Can>
                  </div>
                </div>
              ))}
              <Can I='edit' of={{ __type: 'Field', publisher: catalogId }}>
                {isConceptEditable(conceptForm.concept) && (
                  <ButtonSource
                    add
                    title={localization.addNewSource}
                    handleClick={() => handleAddKilde(push)}
                  />
                )}
              </Can>
            </div>
          )}
        />
      )}
    </div>
  );
};
