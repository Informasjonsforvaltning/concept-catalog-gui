import React, { FC } from 'react';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';
import { RouterProps } from '../../../types/common';

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

const TextAreaFieldPure: FC<Props & RouterProps> = ({
  field,
  form: { touched, errors },
  showLabel,
  label,
  rows = 2,
  language,
  isOnlyOneSelectedLanguage
}) => (
  <div className="px-2">
    <label className="fdk-form-label w-100 fdk-text-strong position-relative" htmlFor={field.name}>
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && (
        <span className="language-indicator language-indicator-text-area">{language}</span>
      )}
      <textarea {...field} rows={rows} className="form-control" />
    </label>
    {get(touched, field.name) && get(errors, field.name) && (
      <div className="alert alert-danger mt-2">{get(errors, field.name)}</div>
    )}
  </div>
);

export const TextAreaField = withRouter(TextAreaFieldPure);
