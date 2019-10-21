import React from 'react';
import { FieldArray } from 'formik';

import { InputField } from '../../../../components/fields/field-input/field-input.component';
import { TextAreaField } from '../../../../components/fields/field-textarea/field-textarea.component';

import { HelpText } from '../../../../components/help-text/help-text.component';
import { localization } from '../../../../lib/localization';

import { FieldArraySource } from '../../../../components/fields/field-array-source/field-array-source.component';
import { MultilingualField } from '../../../../components/multilingual-field/multilingual-field.component';
import { Language } from '../../../../domain/Language';

interface Props {
  languages: Language[];
}

export const Term = ({ languages }: Props): JSX.Element => (
  <div>
    <div className="form-group">
      <HelpText
        title={localization.anbefaltTermTitle}
        required
        helpTextAbstract={localization.anbefaltTermAbstract}
        helpTextDescription={localization.anbefaltTermDescription}
      />
      <MultilingualField name="anbefaltTerm.navn" component={InputField} label="anbefaltTerm" languages={languages} />
    </div>
    <div className="form-group">
      <HelpText
        title={localization.definisjonTitle}
        required
        helpTextAbstract={localization.definisjonAbstract}
        helpTextDescription={localization.definisjonDescription}
      />
      <MultilingualField name="definisjon.tekst" component={TextAreaField} label="definisjon" languages={languages} />
    </div>
    <div className="form-group">
      <HelpText
        title={localization.kildeTitle}
        required={false}
        helpTextAbstract={localization.kildeAbstract}
        helpTextDescription={localization.kildeDescription}
      />
      <FieldArray name="kildebeskrivelse" component={FieldArraySource} />
    </div>
    <div className="form-group">
      <HelpText
        title={localization.merknadTitle}
        required={false}
        helpTextAbstract={localization.merknadAbstract}
        helpTextDescription={localization.merknadDescription}
      />
      <MultilingualField name="merknad" component={TextAreaField} label="merknad" languages={languages} />
    </div>
  </div>
);
