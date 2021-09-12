import React, { FC } from 'react';
import Select from 'react-select';
import find from 'lodash/find';
import { localization } from '../../../lib/localization';
import { Can } from '../../../casl/Can';

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
}) => (
  <div className='px-2'>
    <div className='d-flex align-items-center'>
      <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
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
              options
                ? options.find(option => option.value === field.value)
                : null
            }
            onChange={option =>
              onChangeField(field.name, option, form, onClear, onChange)
            }
            onBlur={field.onBlur}
          />
        </label>
      </Can>
      {showLabel && field.value && (
        <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
          <div>
            <div className='fdk-text-strong'>{label}</div>
            <span>{find(options, { value: field.value }).label}</span>
          </div>
        </Can>
      )}
    </div>
    {touched[field.name] && errors[field.name] && (
      <div className='alert alert-danger mt-2'>{errors[field.name]}</div>
    )}
  </div>
);
