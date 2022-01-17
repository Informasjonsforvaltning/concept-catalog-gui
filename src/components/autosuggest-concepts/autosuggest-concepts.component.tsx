import React, { FC, useState } from 'react';
import Autosuggest from 'react-autosuggest';

import { localization } from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';
import './autosuggest-concepts.scss';
import {
  getConceptSuggestions,
  extractSuggestions
} from '../../api/search-fulltext-api/suggestions';

import SC from './styled';

const renderSuggestionContainer = (containerProps, children) => (
  <div {...containerProps}>
    <div className='d-flex mb-3 react_autosuggest__suggestions-heading'>
      <span className='w-25 first'>
        <strong>{localization.preferredTerm}</strong>
      </span>
      <div className='w-75 ml-5 d-flex'>
        <span className='w-50'>
          <strong>{localization.definition}</strong>
        </span>
        <span className='w-50 ml-5'>
          <strong>{localization.responsible}</strong>
        </span>
      </div>
    </div>
    {children}
  </div>
);

const renderSuggestion = suggestion => (
  <div className='d-flex mb-3'>
    <span className='w-25'>{getTranslateText(suggestion.prefLabel)}</span>
    <div className='w-75 ml-5 d-flex'>
      <span className='w-50'>
        {getTranslateText(suggestion.definition?.text)}
      </span>
      <span className='w-50 ml-5'>
        {getTranslateText(
          suggestion.publisher?.prefLabel || suggestion.publisher?.name
        )}
      </span>
    </div>
  </div>
);

const getSuggestionValue = suggestion => getTranslateText(suggestion.prefLabel);

const loadSuggestions = (value, setSuggestions, lastRequestId) => {
  // Cancel the previous request
  if (lastRequestId !== null) {
    clearTimeout(lastRequestId);
  }

  getConceptSuggestions({
    q: value
  })
    .then(extractSuggestions)
    .then(concepts => {
      lastRequestId = setTimeout(() => {
        setSuggestions(concepts);
      }, 250);
    })
    .catch(() => {});
};

interface Props {
  showLabel?: boolean;
  label?: string;
  showRequired?: boolean;
  onAddSuggestion: (suggestion) => void;
}

export const AutosuggestConcepts: FC<Props> = ({
  showLabel = false,
  label = '',
  showRequired = false,
  onAddSuggestion
}) => {
  const [fieldValue, setFieldValue] = useState<any>('');
  const [suggestions, setSuggestions] = useState<any>([]);

  const lastRequestId = null;

  const onChange = (event, { newValue }) => {
    event.preventDefault();
    setFieldValue(newValue);
  };

  const inputProps = {
    placeholder: localization.searchConcepts,
    value: fieldValue,
    onChange
  };

  const renderInputComponent = props => (
    <div>
      <input {...props} className='form-control' autoComplete='off' />
    </div>
  );

  return (
    <SC.AutosuggestConcepts>
      <SC.Content>
        <SC.Labels>
          {showLabel && label}
          {showRequired && <SC.Required>{localization.required}</SC.Required>}
        </SC.Labels>

        <Autosuggest
          suggestions={suggestions}
          shouldRenderSuggestions={value => !!(value && value.length > 0)}
          onSuggestionsFetchRequested={input =>
            loadSuggestions(input.value, setSuggestions, lastRequestId)
          }
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
          getSuggestionValue={suggestion => getSuggestionValue(suggestion)}
          renderSuggestion={suggestion => renderSuggestion(suggestion)}
          renderSuggestionsContainer={({ containerProps, children }) =>
            renderSuggestionContainer(containerProps, children)
          }
          inputProps={inputProps}
          renderInputComponent={renderInputComponent}
          onSuggestionSelected={(e, { suggestion }) => {
            e.preventDefault();
            onAddSuggestion(suggestion);
            setFieldValue('');
          }}
        />
      </SC.Content>
    </SC.AutosuggestConcepts>
  );
};
