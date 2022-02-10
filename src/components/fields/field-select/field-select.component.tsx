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

export interface OptionProps {
  value: string;
  label: string;
  description: string;
  publisher: string;
}

interface RouteParams {
  catalogId: string;
}

interface ExternalProps {
  options: OptionProps[];
  showCustomOption: boolean;
  showLabel: boolean;
  showRequired: boolean;
  label: string;
  onClear: () => void;
  onChange: () => void;
  onInputChange?: (arg: string) => void;
  defaultValue: OptionProps | OptionProps[];
  isMulti?: boolean;
}

interface Props
  extends ExternalProps,
    RouteComponentProps<RouteParams>,
    FieldProps {}

const onChangeField = (fieldName, option, form, onClear, onChange) => {
  if (!option) {
    onClear(form);
  } else {
    onChange(form, fieldName, option);
  }
};

const SelectFieldPure: FC<Props> = ({
  field: { name, onBlur },
  form,
  options,
  showCustomOption = false,
  showLabel,
  showRequired,
  defaultValue,
  label,
  onClear,
  onChange,
  onInputChange,
  match: {
    params: { catalogId }
  },
  isMulti
}) => {
  const conceptForm = useAppSelector(state => state.conceptForm);

  const renderReadOnlyField = () => (
    <div>
      <SC.ReadOnlyLabel>{label}</SC.ReadOnlyLabel>
      {Array.isArray(defaultValue) &&
        defaultValue?.map(item => <div>{item.label}</div>)}
      {!Array.isArray(defaultValue) && <div>{defaultValue?.label}</div>}
    </div>
  );

  const renderFormatOptionLabel = (
    { label: optionLabel, description, publisher },
    { context }
  ) => {
    if (context === 'value' || !showCustomOption) {
      return <div>{optionLabel}</div>;
    }
    return (
      <SC.Option>
        <SC.OptionLabel>{optionLabel}</SC.OptionLabel>
        <SC.OptionLabel>{description}</SC.OptionLabel>
        <SC.OptionLabel>{publisher}</SC.OptionLabel>
      </SC.Option>
    );
  };

  const renderEditField = () => (
    <SC.EditField htmlFor={name}>
      <SC.Labels>
        {showLabel ? label : null}
        {showRequired && <SC.Required>{localization.required}</SC.Required>}
      </SC.Labels>
      <Select
        isMulti={!!isMulti}
        formatOptionLabel={renderFormatOptionLabel}
        maxMenuHeight={450}
        options={options}
        isClearable
        placeholder={localization.searchConcepts}
        name={name}
        value={defaultValue}
        onChange={option =>
          onChangeField(name, option, form, onClear, onChange)
        }
        onInputChange={onInputChange}
        onBlur={onBlur}
      />
    </SC.EditField>
  );

  return (
    <SC.SelectField>
      <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
        {isConceptEditable(conceptForm.concept)
          ? renderEditField()
          : renderReadOnlyField()}
      </Can>
      <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
        {renderReadOnlyField()}
      </Can>
      {form.touched[name] && form.errors[name] && (
        <div className='alert alert-danger mt-2'>{form.errors[name]}</div>
      )}
    </SC.SelectField>
  );
};

export const SelectField = compose(memo, withRouter)(SelectFieldPure);
