import React, { FC } from 'react';
import _ from 'lodash';
import TagsInput from 'react-tagsinput';
import get from 'lodash/get';

import { isConceptEditable } from '../../../lib/concept';
import './field-input-tags.scss';
import { Can } from '../../../casl/Can';
import { useAppSelector } from '../../../app/redux/hooks';

interface Props {
  field: {
    name: string;
    value: any;
  };
  form: {
    touched: any;
    errors: any;
    setFieldValue: any;
  };
  showLabel: boolean;
  label: string;
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
  const tagNodes = _.get(field, 'value', [])?.map(item => item) ?? [];

  const conceptForm = useAppSelector(state => state.conceptForm);

  const renderReadOnlyField = () => (
    <div className='d-flex align-items-baseline fdk-text-size-small mb-2'>
      {showLabel ? <div className='fdk-text-strong'>{label}</div> : null}
      {!!language && !isOnlyOneSelectedLanguage && get(field, 'value') && (
        <span className='badge fdk-bg-color-primary-lighter mr-2'>
          {language}
        </span>
      )}
      <span>{get(field, 'value', [])?.join(', ')}</span>
    </div>
  );

  const renderEditField = () => (
    <label
      className='fdk-form-label w-100 position-relative'
      htmlFor={field.name}
    >
      {showLabel ? label : null}
      {!!language && !isOnlyOneSelectedLanguage && (
        <span className='language-indicator'>{language}</span>
      )}
      <TagsInput
        value={tagNodes}
        className='fdk-reg-input-tags'
        inputProps={{ placeholder: '' }}
        onChange={tags => setFieldValue(_.get(field, 'name'), tags)}
        addOnBlur
      />
    </label>
  );

  return (
    <div className='px-3'>
      <Can I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
        {isConceptEditable(conceptForm.concept)
          ? renderEditField()
          : renderReadOnlyField()}
      </Can>
      <Can not I='edit field' of={{ __type: 'Field', publisher: catalogId }}>
        {renderReadOnlyField()}
      </Can>
    </div>
  );
};
