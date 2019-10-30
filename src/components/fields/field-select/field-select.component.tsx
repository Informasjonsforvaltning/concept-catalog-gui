import React, { FC } from 'react';
import Select from 'react-select';
import { localization } from '../../../lib/localization';

interface Props {
  field: any;
  options: any[];
  form: any;
  showLabel: boolean;
  label: string;
  type: string;
  onClear: () => {};
  onChange: () => {};
}

const onChangeField = (fieldName, option, form, onClear, onChange) => {
  onChange(form, fieldName, option);
  if (option == null) {
    onClear(form);
  } else {
    form.setFieldValue(fieldName, option.value);
  }
};

export const SelectField: FC<Props> = ({
  field, // { name, value, onChange, onBlur }
  options,
  form: { touched, errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  form,
  onClear,
  onChange
}) => {
  return (
    <div className="px-2">
      <div className="d-flex align-items-center">
        <label className="fdk-form-label w-100 fdk-text-strong" htmlFor={field.name}>
          {showLabel ? label : null}

          <Select
            options={options}
            isClearable
            placeholder={localization.select}
            name={field.name}
            value={options ? options.find(option => option.value === field.value) : null}
            onChange={option => onChangeField(field.name, option, form, onClear, onChange)}
            onBlur={field.onBlur}
          />
        </label>
      </div>
      {touched[field.name] && errors[field.name] && <div className="alert alert-danger mt-2">{errors[field.name]}</div>}
    </div>
  );
};
