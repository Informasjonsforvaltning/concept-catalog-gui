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
  language: string;
  isOnlyOneSelectedLanguage: boolean;
}

export const InputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  type,
  language,
  isOnlyOneSelectedLanguage
}: Props): JSX.Element => (
  <div className='px-2'>
    <div className='d-flex align-items-center'>
      <label className='fdk-form-label w-100 fdk-text-strong position-relative' htmlFor={field.name}>
        {showLabel ? label : null}
        {!!language && !isOnlyOneSelectedLanguage && <span className='language-indicator'>{language}</span>}
        <input {...field} type={type} className='form-control' autoComplete='off' />
      </label>
    </div>
    {touched[field.name] && errors[field.name] && <div className='alert alert-danger mt-2'>{errors[field.name]}</div>}
  </div>
);
