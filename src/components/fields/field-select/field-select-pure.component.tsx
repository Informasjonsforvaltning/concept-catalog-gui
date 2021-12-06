import React, { FC } from 'react';
import Select from 'react-select';

import { isConceptEditable } from '../../../lib/concept';
import { localization } from '../../../lib/localization';
import { Can } from '../../../casl/Can';
import { useAppSelector } from '../../../app/redux/hooks';

interface Props {
  field: any;
  options: any[];
  form: any;
  showLabel: boolean;
  label: string;
  onClear: () => void;
  onChange: () => void;
  catalogId: string;
}

const onChangeField = (fieldName, option, form, onClear, onChange) => {
  onChange(form, fieldName, option);
  if (option == null) {
    onClear(form);
  } else {
    form.setFieldValue(fieldName, option.value);
  }
};

export const SelectFieldPure: FC<Props> = ({
  field, // { name, value, onChange, onBlur }
  options,
  form: { touched, errors }, // also values, dirty, isValid, status, etc.
  showLabel,
  label,
  form,
  onClear,
  onChange,
  catalogId
}) => {
  const conceptForm = useAppSelector(state => state.conceptForm);

  const renderReadOnlyField = () => (
    <div>
      <div className='fdk-text-strong'>{label}</div>
      <span>{options.find(option => option.value === field.value)?.label}</span>
    </div>
  );

  const renderEditField = () => (
    <label
      className='fdk-form-label w-100 fdk-text-strong'
      htmlFor={field.name}
    >
      {showLabel ? label : null}

      <Select
        options={options}
        isClearable
        placeholder={localization.select}
        name={field.name}
        value={
          options ? options.find(option => option.value === field.value) : null
        }
        onChange={option =>
          onChangeField(field.name, option, form, onClear, onChange)
        }
        onBlur={field.onBlur}
      />
    </label>
  );

  return (
    <div className='px-2'>
      <div className='d-flex align-items-center'>
        <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          {isConceptEditable(conceptForm.concept)
            ? renderEditField()
            : renderReadOnlyField()}
        </Can>
        {showLabel && field.value && (
          <Can
            not
            I='edit field'
            of={{ __type: 'Field', publisher: catalogId }}
          >
            {renderReadOnlyField()}
          </Can>
        )}
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className='alert alert-danger mt-2'>{errors[field.name]}</div>
      )}
    </div>
  );
};
