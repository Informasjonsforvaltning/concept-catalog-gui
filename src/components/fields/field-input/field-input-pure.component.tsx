import React, { FC } from 'react';
import get from 'lodash/get';
import isUrl from 'is-url';

import { Can } from '../../../casl/Can';
import { isConceptEditable } from '../../../lib/concept';
import { useAppSelector } from '../../../app/redux/hooks';

interface Props {
  field: {
    name: string;
  };
  form: {
    errors: any;
  };
  showLabel: boolean;
  label: string;
  type: string;
  language: string;
  isOnlyOneSelectedLanguage: boolean;
  catalogId: string;
  placeholder?: string;
  hideError?: boolean;
}

export const InputFieldPure: FC<Props> = ({
  field, // { name, value, onChange, onBlur }
  form: { errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  type,
  language,
  isOnlyOneSelectedLanguage,
  catalogId,
  placeholder = '',
  hideError = false
}) => {
  const conceptForm = useAppSelector(state => state.conceptForm);

  const renderReadOnlyField = () => (
    <div className='d-flex align-items-baseline mb-2'>
      {showLabel ? <div className='fdk-text-strong'>{label}</div> : null}
      {!!language && !isOnlyOneSelectedLanguage && get(field, 'value') && (
        <span className='badge fdk-bg-color-primary-lighter fdk-text-size-small mr-2'>
          {language}
        </span>
      )}
      <span>
        {isUrl(get(field, 'value')) ? (
          <a href={get(field, 'value')}>{get(field, 'value')}</a>
        ) : (
          get(field, 'value')
        )}
      </span>
    </div>
  );

  const renderEditField = () => (
    <label
      className='fdk-form-label w-100 fdk-text-strong position-relative'
      htmlFor={field.name}
    >
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && (
        <span className='language-indicator'>{language}</span>
      )}
      <input
        {...field}
        placeholder={placeholder}
        type={type}
        className='form-control'
        autoComplete='off'
      />
    </label>
  );

  return (
    <div className='px-3'>
      <div className='d-flex align-items-center'>
        <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {isConceptEditable(conceptForm.concept)
            ? renderEditField()
            : renderReadOnlyField()}
        </Can>
        <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {renderReadOnlyField()}
        </Can>
      </div>
      {!hideError && get(errors, field.name) && (
        <div className='alert alert-danger mt-2'>{get(errors, field.name)}</div>
      )}
    </div>
  );
};
