import React from 'react';

interface Props {
  rows: number;
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

export const TextAreaField = ({ field, form: { touched, errors }, showLabel, label, rows = 2 }: Props): JSX.Element => (
  <div className="pl-2">
    <label className="fdk-form-label w-100 fdk-text-strong" htmlFor={field.name}>
      {showLabel ? label : null}
      <textarea {...field} rows={rows} className="form-control" />
    </label>
    {touched[field.name] && errors[field.name] && <div className="alert alert-danger mt-3">{errors[field.name]}</div>}
  </div>
);
