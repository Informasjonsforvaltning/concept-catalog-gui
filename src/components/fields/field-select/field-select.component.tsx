import React, { FC, memo } from 'react';
import { compose } from '@reduxjs/toolkit';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Select from 'react-select';
import { FieldProps } from 'formik';

import { useAppSelector } from '../../../app/redux/hooks';
import { Can } from '../../../casl/Can';
import { isConceptEditable } from '../../../lib/concept';
import { localization } from '../../../lib/localization';

import SC from './styled';

interface RouteParams {
  catalogId: string;
}

interface ExternalProps {
  options: any[];
  showLabel: boolean;
  showRequired: boolean;
  label: string;
  onClear: () => void;
  onChange: () => void;
  onInputChange?: (arg: string) => void;
}

interface Props
  extends ExternalProps,
    RouteComponentProps<RouteParams>,
    FieldProps {}

const onChangeField = (fieldName, option, form, onClear, onChange) => {
  onChange(form, fieldName, option);
  if (option == null) {
    onClear(form);
  } else {
    form.setFieldValue(fieldName, option.value);
  }
};

const SelectFieldPure: FC<Props> = ({
  field: { name, value, onBlur },
  form,
  options,
  showLabel,
  showRequired,
  label,
  onClear,
  onChange,
  onInputChange,
  match: {
    params: { catalogId }
  }
}) => {
  const conceptForm = useAppSelector(state => state.conceptForm);

  const renderReadOnlyField = () => (
    <div>
      <div className='fdk-text-strong'>{label}</div>
      <span>{options.find(option => option.value === value)?.label}</span>
    </div>
  );

  const renderEditField = () => (
    <label className='fdk-form-label w-100 fdk-text-strong' htmlFor={name}>
      <SC.Labels>
        {showLabel ? label : null}
        {showRequired && <SC.Required>{localization.required}</SC.Required>}
      </SC.Labels>

      <Select
        maxMenuHeight={450}
        options={options}
        isClearable
        placeholder={localization.select}
        name={name}
        value={options ? options.find(option => option.value === value) : null}
        onChange={option =>
          onChangeField(name, option, form, onClear, onChange)
        }
        onInputChange={onInputChange}
        onBlur={onBlur}
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
        {showLabel && value && (
          <Can
            not
            I='edit field'
            of={{ __type: 'Field', publisher: catalogId }}
          >
            {renderReadOnlyField()}
          </Can>
        )}
      </div>
      {form.touched[name] && form.errors[name] && (
        <div className='alert alert-danger mt-2'>{form.errors[name]}</div>
      )}
    </div>
  );
};

export const SelectField = compose(memo, withRouter)(SelectFieldPure);
