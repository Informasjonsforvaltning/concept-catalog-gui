import React from 'react';
import _ from 'lodash';
import TagsInput from 'react-tagsinput';
import './field-input-tags.scss';

interface Props {
  field: {
    name: string;
    value: any;
  };
  form: {
    touched: any;
    errors: object;
    setFieldValue: any;
  };
  showLabel: boolean;
  label: string;
  type: string;
}

export const InputTagsField = ({ field, showLabel, label, form: { setFieldValue } }: Props): JSX.Element => {
  const tagNodes = _.get(field, 'value', []).map(item => item);
  return (
    <div className="pl-2">
      <label className="fdk-form-label w-100" htmlFor={field.name}>
        {showLabel ? label : null}
        <div className="d-flex align-items-center">
          <TagsInput
            value={tagNodes}
            className="fdk-reg-input-tags"
            inputProps={{ placeholder: '' }}
            onChange={tags => setFieldValue(_.get(field, 'name'), tags)}
          />
        </div>
      </label>
    </div>
  );
};
