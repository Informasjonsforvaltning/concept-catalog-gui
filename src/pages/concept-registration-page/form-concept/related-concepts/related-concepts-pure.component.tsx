import React, { FC } from 'react';
import { FieldArray } from 'formik';

import { localization } from '../../../../lib/localization';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { Can } from '../../../../casl/Can';
import { AutosuggestConcepts } from '../../../../components/autosuggest-concepts/autosuggest-concepts.component';
import { getTranslateText } from '../../../../lib/translateText';

interface Suggestion {
  identifier: string;
}

const addSeeAlso = (suggestion: Suggestion, form): void => {
  const seeAlsoValues: string[] = form.values.seOgså;
  form.setFieldValue('seOgså', [...seeAlsoValues, suggestion.identifier]);
};

const removeSeeAlso = (identifier: string, form): void => {
  const seeAlsoValues: string[] = form.values.seOgså;
  const filteredValues = seeAlsoValues.filter(el => el !== identifier);
  form.setFieldValue('seOgså', filteredValues);
};

interface SkosConcept {
  id: string;
  identifier: string;
  prefLabel: {
    nb?: string;
    nn?: string;
    en?: string;
  };
}

interface Props {
  catalogId: string;
  seeAlsoConcepts?: SkosConcept[];
}

export const RelatedConceptsPure: FC<Props> = ({ catalogId, seeAlsoConcepts = [] }) => (
  <div>
    <div className="form-group">
      <HelpText title={localization.seeAlso} helpTextAbstract={localization.seOgsaaAbstract} />

      <FieldArray
        name="seOgså"
        render={({ form }) => (
          <>
            <Can I="edit" of={{ __type: 'Field', publisher: catalogId }}>
              <AutosuggestConcepts onAddSuggestion={(suggestion: Suggestion) => addSeeAlso(suggestion, form)} />
            </Can>
            <div className="pl-2">
              {seeAlsoConcepts.map((seeAlso, index) => (
                <div key={`${seeAlso}-${index}`} className="badge badge-dark mt-3 mr-3 p-3">
                  <span>{getTranslateText(seeAlso.prefLabel)}</span>
                  <Can I="edit" of={{ __type: 'Field', publisher: catalogId }}>
                    <button
                      type="button"
                      className="fdk-btn-no-border"
                      onClick={() => removeSeeAlso(seeAlso.identifier, form)}
                    >
                      <i className="fa fa-times-circle ml-2 fdk-color-white" />
                    </button>
                  </Can>
                </div>
              ))}
            </div>
          </>
        )}
      />
    </div>
  </div>
);
