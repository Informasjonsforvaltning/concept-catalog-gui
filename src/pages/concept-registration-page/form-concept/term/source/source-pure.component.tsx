import React, { FC } from 'react';
import { Field, FieldArray, useField } from 'formik';
import { v4 } from 'uuid';
import _ from 'lodash';
import { localization } from '../../../../../lib/localization';
import { InputField } from '../../../../../components/fields/field-input/field-input.component';
import { ButtonSource } from '../../../../../components/button-source/button-source.component';
import { SelectField } from '../../../../../components/fields/field-select/field-select.component';
import './source.scss';

const options = [
  { value: 'egendefinert', label: localization.custom },
  { value: 'basertPaaKilde', label: localization.basedOnSource },
  { value: 'sitatFraKilde', label: localization.quoteFromSource }
];

const handleClearKildebeskrivelse = form => {
  form.values.kildebeskrivelse = null;
  form.setFieldValue('kildebeskrivelse', form.values.kildebeskrivelse);
};

const handleChangeForholdTilKilde = (form, fieldName, option) => {
  if (fieldName === 'kildebeskrivelse.forholdTilKilde' && option != null) {
    // Create default kildebeskrivelse if null
    if (!_.get(form, 'values.kildebeskrivelse')) {
      form.values.kildebeskrivelse = {};
      form.values.kildebeskrivelse.kilde = [];
    }

    // Create a default kilde-row for the user if its empty
    if (_.get(form, 'values.kildebeskrivelse.kilde', []).length < 1) {
      form.values.kildebeskrivelse.kilde.push({ id: v4(), tekst: '', uri: '' });
      form.setFieldValue('kildebeskrivelse', form.values.kildebeskrivelse);
    }
  }
};

const handleAddKilde = (form: object, push: Function) => {
  push({ id: v4(), tekst: '', uri: '' });
};

const handleRemoveKilde = (form, index) => {
  const { kilde } = form.values.kildebeskrivelse;
  if (Array.isArray(kilde)) {
    kilde.splice(index, 1);
    form.setFieldValue('kildebeskrivelse', form.values.kildebeskrivelse);
  }
};

const getKilde = form => _.get(form, ['values', 'kildebeskrivelse', 'kilde'], []);

interface Props {
  catalogId: string;
}
export const SourcePure: FC<Props> = () => {
  const [field] = useField('kildebeskrivelse');
  const forholdTilKilde = _.get(field, ['value', 'forholdTilKilde']);

  return (
    <div>
      <div className="row d-flex">
        <div className="col-sm-5 mb-4">
          <Field
            className="col-sm-5"
            name="kildebeskrivelse.forholdTilKilde"
            component={SelectField}
            label={localization.relationToSource}
            showLabel
            options={options}
            onClear={handleClearKildebeskrivelse}
            onChange={handleChangeForholdTilKilde}
          />
        </div>
        <div className="col-sm-7" />
      </div>
      {forholdTilKilde && forholdTilKilde !== 'egendefinert' && (
        <FieldArray
          name="kildebeskrivelse.kilde"
          render={({ form, push }) => (
            <div>
              {getKilde(form).map((kilde, index) => {
                return (
                  <div key={`${kilde.id}-${index}`} className="row d-flex mb-4">
                    <div className="col-sm-5">
                      <Field
                        name={`kildebeskrivelse.kilde[${index}].tekst`}
                        component={InputField}
                        label={localization.titleSource}
                        showLabel
                      />
                    </div>

                    <div className="col-sm-5">
                      <Field
                        name={`kildebeskrivelse.kilde[${index}].uri`}
                        component={InputField}
                        label={localization.linkSource}
                        showLabel
                      />
                    </div>

                    <div className="fdk-source col-sm-2">
                      <ButtonSource
                        remove
                        title={localization.removeSource}
                        handleClick={() => handleRemoveKilde(form, index)}
                      />
                    </div>
                  </div>
                );
              })}
              <ButtonSource add title={localization.addNewSource} handleClick={() => handleAddKilde(form, push)} />
            </div>
          )}
        />
      )}
    </div>
  );
};
