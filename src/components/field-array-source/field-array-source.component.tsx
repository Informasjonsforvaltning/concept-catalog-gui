import { Field, FieldArray } from 'formik';
import * as React from 'react';
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
          {_.get(props, ['form', 'values', 'kildebeskrivelse', 'kilde'], []).map((kilde, index) => {
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
                  <ButtonSource remove title={localization['removeSource']} handleClick={() => props.remove(index)} />
                </div>
              </div>
            );
          })}

          <ButtonSource
            add
            title={localization['addNewSource']}
            handleClick={() => {
              props.push({ id: v4(), tekst: '', uri: '' });
            }}
          />
        </div>
      )}
    </div>
  );
};
