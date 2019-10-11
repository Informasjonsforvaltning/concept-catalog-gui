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
  language: string;
  isOnlyOneSelectedLanguage: boolean;
}

export const TextAreaField = ({
  field,
  form: { touched, errors },
  showLabel,
  label,
  rows = 2,
  language,
  isOnlyOneSelectedLanguage
}: Props): JSX.Element => (
  <div className='px-2'>
    <label className='fdk-form-label w-100 fdk-text-strong position-relative' htmlFor={field.name}>
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && (
        <span className='language-indicator language-indicator-text-area'>{language}</span>
      )}
      <textarea {...field} rows={rows} className='form-control' />
    </label>
    {touched[field.name] && errors[field.name] && <div className='alert alert-danger mt-2'>{errors[field.name]}</div>}
  </div>
);
