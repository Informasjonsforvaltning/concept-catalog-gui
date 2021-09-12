import React from 'react';
import { InputTagsField } from '../../../../components/fields/field-input-tags/field-input-tags.component';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { localization } from '../../../../lib/localization';
import { Language } from '../../../../domain/Language';
import { MultilingualField } from '../../../../components/multilingual-field/multilingual-field.component';

interface Props {
  languages: Language[];
}

export const AllowedAndDiscouraged = ({ languages }: Props): JSX.Element => (
  <div>
    <div className='form-group'>
      <HelpText
        title={localization.tillattTermTitle}
        helpTextAbstract={localization.tillattTermAbstract}
        helpTextDescription={localization.tillattTermDescription}
      />
      <MultilingualField
        name='tillattTerm'
        component={InputTagsField}
        label='tillattTerm'
        languages={languages}
      />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.fraraadetTermTitle}
        helpTextAbstract={localization.fraraadetTermAbstract}
        helpTextDescription={localization.fraraadetTermDescription}
      />
      <MultilingualField
        name='frarådetTerm'
        component={InputTagsField}
        label='frarådetTerm'
        languages={languages}
      />
    </div>
  </div>
);
