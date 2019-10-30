import React, { FC } from 'react';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';
import { RouterProps } from '../../../types/common';

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

const InputFieldPure: FC<Props & RouterProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  type,
  language,
  isOnlyOneSelectedLanguage
}) => (
  <div className="px-2">
    <div className="d-flex align-items-center">
      <label className="fdk-form-label w-100 fdk-text-strong position-relative" htmlFor={field.name}>
        {showLabel ? label : null}
        {!!language && !isOnlyOneSelectedLanguage && <span className="language-indicator">{language}</span>}
        <input {...field} type={type} className="form-control" autoComplete="off" />
      </label>
    </div>
    {get(touched, field.name) && get(errors, field.name) && (
      <div className="alert alert-danger mt-2">{get(errors, field.name)}</div>
    )}
  </div>
);

export const InputField = withRouter(InputFieldPure);
