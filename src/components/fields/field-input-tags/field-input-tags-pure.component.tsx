import React, { FC } from 'react';
import _ from 'lodash';
import TagsInput from 'react-tagsinput';
import get from 'lodash/get';
import './field-input-tags.scss';
import { Can } from '../../../casl/Can';

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
  catalogId: string;
}

export const InputTagsFieldPure: FC<Props> = ({
  field,
  showLabel,
  label,
  form: { setFieldValue },
  language,
  isOnlyOneSelectedLanguage,
  catalogId
}) => {
  const tagNodes = _.get(field, 'value', []).map(item => item);
  return (
    <div className="px-2">
      <Can I="edit field" of={{ __type: 'Field', publisher: catalogId }}>
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
      </Can>
      <Can not I="edit field" of={{ __type: 'Field', publisher: catalogId }}>
        <div className="d-flex align-items-baseline fdk-text-size-small mb-2">
          {showLabel ? <div className="fdk-text-strong">{label}</div> : null}
          {!!language && !isOnlyOneSelectedLanguage && get(field, 'value') && (
            <span className="badge fdk-bg-color-primary-lighter mr-2">{language}</span>
          )}
          <span>{get(field, 'value', []).join(', ')}</span>
        </div>
      </Can>
    </div>
  );
};
