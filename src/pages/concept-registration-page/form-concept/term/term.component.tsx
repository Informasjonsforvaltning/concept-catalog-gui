import React from 'react';

import { InputField } from '../../../../components/fields/field-input/field-input.component';
import { TextAreaField } from '../../../../components/fields/field-textarea/field-textarea.component';

import { HelpText } from '../../../../components/help-text/help-text.component';
import { localization } from '../../../../lib/localization';

import { Source } from './source/source.component';
import { MultilingualField } from '../../../../components/multilingual-field/multilingual-field.component';
import { Language } from '../../../../types';

interface Props {
  languages: Language[];
  isReadOnly: boolean;
}

export const Term = ({ languages, isReadOnly = false }: Props): JSX.Element => (
  <div>
    <div className='form-group'>
      <HelpText
        title={localization.anbefaltTermTitle}
        showRequired={!isReadOnly}
        helpTextAbstract={localization.anbefaltTermAbstract}
        helpTextDescription={localization.anbefaltTermDescription}
      />
      <MultilingualField
        name='anbefaltTerm.navn'
        component={InputField}
        label='anbefaltTerm'
        languages={languages}
      />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.definisjonTitle}
        showRequired={!isReadOnly}
        helpTextAbstract={localization.definisjonAbstract}
        helpTextDescription={localization.definisjonDescription}
      />
      <MultilingualField
        name='definisjon.tekst'
        component={TextAreaField}
        label='definisjon'
        languages={languages}
      />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.kildeTitle}
        helpTextAbstract={localization.kildeAbstract}
        helpTextDescription={localization.kildeDescription}
      />
      <Source fieldName='definisjon' />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.folkeligForklaringTitle}
        showRequired={!isReadOnly}
        helpTextAbstract={localization.folkeligForklaringAbstract}
        helpTextDescription={localization.folkeligForklaringDescription}
      />
      <MultilingualField
        name='folkeligForklaring.tekst'
        component={TextAreaField}
        label='folkeligForklaring'
        languages={languages}
      />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.folkeligForklaringKildeTitle}
        helpTextAbstract={localization.folkeligForklaringKildeAbstract}
        helpTextDescription={localization.folkeligForklaringKildeDescription}
      />
      <Source fieldName='folkeligForklaring' />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.rettsligForklaringTitle}
        showRequired={!isReadOnly}
        helpTextAbstract={localization.rettsligForklaringAbstract}
        helpTextDescription={localization.rettsligForklaringDescription}
      />
      <MultilingualField
        name='rettsligForklaring.tekst'
        component={TextAreaField}
        label='rettsligForklaring'
        languages={languages}
      />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.rettsligForklaringKildeTitle}
        helpTextAbstract={localization.rettsligForklaringKildeAbstract}
        helpTextDescription={localization.rettsligForklaringKildeDescription}
      />
      <Source fieldName='rettsligForklaring' />
    </div>
    <div className='form-group'>
      <HelpText
        title={localization.merknadTitle}
        helpTextAbstract={localization.merknadAbstract}
        helpTextDescription={localization.merknadDescription}
      />
      <MultilingualField
        name='merknad'
        component={TextAreaField}
        label='merknad'
        languages={languages}
      />
    </div>
  </div>
);
