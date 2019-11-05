import React, { FC } from 'react';
import get from 'lodash/get';
import { Can } from '../../../casl/Can';

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
  catalogId: string;
}

export const InputFieldPure: FC<Props> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  type,
  language,
  isOnlyOneSelectedLanguage,
  catalogId
}) => (
  <div className="px-2">
    <div className="d-flex align-items-center">
      <Can I="edit field" of={{ __type: 'Field', publisher: catalogId }}>
        <label className="fdk-form-label w-100 fdk-text-strong position-relative" htmlFor={field.name}>
          {showLabel ? label : null}
          {!!language && !isOnlyOneSelectedLanguage && <span className="language-indicator">{language}</span>}
          <input {...field} type={type} className="form-control" autoComplete="off" />
        </label>
      </Can>
      <Can not I="edit field" of={{ __type: 'Field', publisher: catalogId }}>
        <div className="mb-2">
          {showLabel ? <div className="fdk-text-strong">{label}</div> : null}
          {!!language && !isOnlyOneSelectedLanguage && get(field, 'value') && (
            <span className="badge fdk-bg-color-primary-lighter mr-2">{language}</span>
          )}
          <span>{get(field, 'value')}</span>
        </div>
      </Can>
    </div>
    {get(touched, field.name) && get(errors, field.name) && (
      <div className="alert alert-danger mt-2">{get(errors, field.name)}</div>
    )}
  </div>
);
