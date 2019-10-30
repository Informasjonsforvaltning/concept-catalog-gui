import React, { FC } from 'react';
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
  language: string;
  isOnlyOneSelectedLanguage: boolean;
}

export const InputTagsField: FC<Props> = ({
  field,
  showLabel,
  label,
  form: { setFieldValue },
  language,
  isOnlyOneSelectedLanguage
}) => {
  const tagNodes = _.get(field, 'value', []).map(item => item);
  return (
    <div className="px-2">
      <label className="fdk-form-label w-100 position-relative" htmlFor={field.name}>
        {showLabel ? label : null}
        {!!language && !isOnlyOneSelectedLanguage && <span className="language-indicator">{language}</span>}
        <TagsInput
          value={tagNodes}
          className="fdk-reg-input-tags"
          inputProps={{ placeholder: '' }}
          onChange={tags => setFieldValue(_.get(field, 'name'), tags)}
        />
      </label>
    </div>
  );
};
