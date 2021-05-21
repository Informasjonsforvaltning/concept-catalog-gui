import React, { FC } from 'react';
import get from 'lodash/get';
import { Can } from '../../../casl/Can';

interface Props {
  rows: number;
  field: {
    name: string;
  };
  form: {
    errors: object;
  };
  showLabel: boolean;
  label: string;
  language: string;
  isOnlyOneSelectedLanguage: boolean;
  catalogId: string;
}

export const TextAreaFieldPure: FC<Props> = ({
  field,
  form: { errors },
  showLabel,
  label,
  rows = 2,
  language,
  isOnlyOneSelectedLanguage,
  catalogId
}) => (
  <div className="px-2">
    <Can I="edit field" of={{ __type: 'Field', publisher: catalogId }}>
      <label className="fdk-form-label w-100 fdk-text-strong position-relative" htmlFor={field.name}>
        {showLabel ? label : null}
        {!!language && !isOnlyOneSelectedLanguage && (
          <span className="language-indicator language-indicator-text-area">{language}</span>
        )}
        <textarea {...field} rows={rows} className="form-control" />
      </label>
    </Can>
    <Can not I="edit field" of={{ __type: 'Field', publisher: catalogId }}>
      <div className="d-flex align-items-baseline mb-2">
        {showLabel ? label : null}
        {!!language && !isOnlyOneSelectedLanguage && get(field, 'value') && (
          <span className="badge fdk-bg-color-primary-lighter fdk-text-size-small mr-2">{language}</span>
        )}
        <span>{get(field, 'value')}</span>
      </div>
    </Can>
    {get(errors, field.name) && <div className="alert alert-danger mt-2">{get(errors, field.name)}</div>}
  </div>
);
