import React from 'react';
import { Field } from 'formik';
import { localization } from '../../lib/localization';
import { InputField } from '../../components/field-input/field-input.component';
import { ButtonSource } from '../../components/button-source/button-source.component';
import { SelectField } from '../../components/field-select/field-select.component';
import { v4 } from 'uuid';
import _ from 'lodash';
import './field-array-source.scss';

const options = [
  { value: 'egendefinert', label: localization['custom'] },
  { value: 'basertPaaKilde', label: localization['basedOnSource'] },
  { value: 'sitatFraKilde', label: localization['quoteFromSource'] }
];

const handleClearKildebeskrivelse = form => {
  form.setFieldValue('kildebeskrivelse', null);
};

const handleAddKilde = form => {
  if (!Array.isArray(form.values.kildebeskrivelse.kilde)) {
    form.values.kildebeskrivelse.kilde = [];
  }
  form.values.kildebeskrivelse.kilde.push({ id: v4(), tekst: '', uri: '' });
  form.setFieldValue('kildebeskrivelse', form.values.kildebeskrivelse);
};

const handleRemoveKilde = (form, index) => {
  const { kilde } = form.values.kildebeskrivelse;
  if (Array.isArray(kilde)) {
    kilde.splice(index, 1);
    form.setFieldValue('kildebeskrivelse', form.values.kildebeskrivelse);
  }
};

const getKilde = props => _.get(props, ['form', 'values', 'kildebeskrivelse', 'kilde'], []);

export const FieldArraySource = (props): JSX.Element => {
  const forholdTilKilde = _.get(props, 'form.values.kildebeskrivelse.forholdTilKilde');

  return (
    <div>
      <div className="row d-flex fdk-after-element">
        <div className="col-sm-5">
          <Field
            className="fdk-after-element col-sm-5"
            name={`kildebeskrivelse.forholdTilKilde`}
            component={SelectField}
            label={localization['relationToSource']}
            showLabel={true}
            options={options}
            onClear={handleClearKildebeskrivelse}
          />
        </div>
        <div className="col-sm-7" />
      </div>

      {forholdTilKilde && forholdTilKilde !== 'egendefinert' && (
        <div>
          {getKilde(props).map((kilde, index) => {
            return (
              <div key={kilde.id} className="row d-flex fdk-after-element">
                <div className="col-sm-5">
                  <Field
                    name={`kildebeskrivelse.kilde[${index}].tekst`}
                    component={InputField}
                    label={localization.titleSource}
                    showLabel={true}
                  />
                </div>

                <div className="col-sm-5">
                  <Field
                    className="fdk-after-element"
                    name={`kildebeskrivelse.kilde[${index}].uri`}
                    component={InputField}
                    label={localization.linkSource}
                    showLabel={true}
                  />
                </div>

                <div className="fdk-source col-sm-2">
                  <ButtonSource
                    remove
                    title={localization['removeSource']}
                    handleClick={() => handleRemoveKilde(props.form, index)}
                  />
                </div>
              </div>
            );
          })}

          <ButtonSource add title={localization['addNewSource']} handleClick={() => handleAddKilde(props.form)} />
        </div>
      )}
    </div>
  );
};
