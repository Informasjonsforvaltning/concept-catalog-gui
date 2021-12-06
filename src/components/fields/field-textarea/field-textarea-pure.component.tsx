import React, { FC } from 'react';
import get from 'lodash/get';

import { Can } from '../../../casl/Can';
import { isConceptEditable } from '../../../lib/concept';
import { useAppSelector } from '../../../app/redux/hooks';

interface Props {
  rows: number;
  field: {
    name: string;
  };
  form: {
    errors: any;
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
}) => {
  const conceptForm = useAppSelector(state => state.conceptForm);

  const renderReadOnlyField = () => (
    <div className='d-flex align-items-baseline mb-2'>
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && get(field, 'value') && (
        <span className='badge fdk-bg-color-primary-lighter fdk-text-size-small mr-2'>
          {language}
        </span>
      )}
      <span>{get(field, 'value')}</span>
    </div>
  );

  const renderEditField = () => (
    <label
      className='fdk-form-label w-100 fdk-text-strong position-relative'
      htmlFor={field.name}
    >
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && (
        <span className='language-indicator language-indicator-text-area'>
          {language}
        </span>
      )}
      <textarea {...field} rows={rows} className='form-control' />
    </label>
  );

  return (
    <div className='px-2'>
      <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
        {isConceptEditable(conceptForm.concept)
          ? renderEditField()
          : renderReadOnlyField()}
      </Can>
      <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
        {renderReadOnlyField()}
      </Can>
      {get(errors, field.name) && (
        <div className='alert alert-danger mt-2'>{get(errors, field.name)}</div>
      )}
    </div>
  );
};
