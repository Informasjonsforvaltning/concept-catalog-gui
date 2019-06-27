import React from 'react';

interface Props {
  field: {
    name: string;
  };
  form: {
    touched: any;
    errors: object;
  };
  showLabel: boolean;
  label: string;
  type: string;
}

export const InputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  type
}: Props): JSX.Element => (
  <div className="pl-2">
    <div className="d-flex align-items-center">
      <label className="fdk-form-label w-100 fdk-text-strong" htmlFor={field.name}>
        {showLabel ? label : null}
        <input {...field} type={type} className="form-control" autoComplete="off" />
      </label>
    </div>
    {touched[field.name] && errors[field.name] && <div className="alert alert-danger mt-3">{errors[field.name]}</div>}
  </div>
);
