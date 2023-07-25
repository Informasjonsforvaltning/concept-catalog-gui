import React, { FC } from 'react';
import get from 'lodash/get';

import { Can } from '../../../casl/Can';
import { isConceptEditable } from '../../../lib/concept';
import { useAppSelector } from '../../../app/redux/hooks';
import './field-checkbox.scss';

interface Props {
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

export const CheckboxFieldPure: FC<Props> = ({
  field, // { name, value, onChange, onBlur }
  form: { errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  language,
  isOnlyOneSelectedLanguage,
  catalogId
}) => {
  const conceptForm = useAppSelector(state => state.conceptForm);
  const [checked, setChecked] = React.useState(get(field, 'value') === 'true');
  const renderField = (editable: boolean) => (
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
        type='checkbox'
        className='form-control fdk-checkbox'
        checked={checked}
        disabled={!editable}
        onClick={() => setChecked(!checked)}
        value='true'
      />
    </label>
  );

  return (
    <div className='px-3'>
      <div className='d-flex align-items-center'>
        <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {renderField(isConceptEditable(conceptForm.concept) ?? false)}
        </Can>
        <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {renderField(false)}
        </Can>
      </div>
      {get(errors, field.name) && (
        <div className='alert alert-danger mt-2'>{get(errors, field.name)}</div>
      )}
    </div>
  );
};
