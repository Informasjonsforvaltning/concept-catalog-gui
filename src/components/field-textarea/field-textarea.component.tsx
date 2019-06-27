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
}

export const TextAreaField = ({ field, form: { touched, errors }, showLabel, label }: Props): JSX.Element => (
  <div className="pl-2">
    <label className="fdk-form-label w-100 fdk-text-strong" htmlFor={field.name}>
      {showLabel ? label : null}
      <textarea {...field} className="form-control" />
    </label>
    {touched[field.name] && errors[field.name] && <div className="alert alert-danger mt-3">{errors[field.name]}</div>}
  </div>
);
