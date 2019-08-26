import React from 'react';
import Select from 'react-select';

interface Props {
  field: any;
  options: any[];
  form: any;
  showLabel: boolean;
  label: string;
  type: string;
}

export const SelectField = ({
  field, // { name, value, onChange, onBlur }
  options,
  form: { touched, errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  form
}: Props): JSX.Element => {
  return (
    <div className="px-2">
      <div className="d-flex align-items-center">
        <label className="fdk-form-label w-100 fdk-text-strong" htmlFor={field.name}>
          {showLabel ? label : null}

          <Select
            options={options}
            name={field.name}
            value={options ? options.find(option => option.value === field.value) : ''}
            onChange={option => form.setFieldValue(field.name, option.value)}
            onBlur={field.onBlur}
          />
        </label>
      </div>
      {touched[field.name] && errors[field.name] && <div className="alert alert-danger mt-2">{errors[field.name]}</div>}
    </div>
  );
};
