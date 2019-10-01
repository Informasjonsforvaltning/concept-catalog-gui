import React from 'react';
import { Field, FieldArray } from 'formik';

import { InputField } from '../../../../components/fields/field-input/field-input.component';
import { TextAreaField } from '../../../../components/fields/field-textarea/field-textarea.component';

import { HelpText } from '../../../../components/help-text/help-text.component';
import { localization } from '../../../../lib/localization';

import { FieldArraySource } from '../../../../components/fields/field-array-source/field-array-source.component';

export const Term = (props): JSX.Element => (
  <div>
    <div className="form-group">
      <HelpText
        title={localization.anbefaltTermTitle}
        required={true}
        helpTextAbstract={localization.anbefaltTermAbstract}
        helpTextDescription={localization.anbefaltTermDescription}
      />
      <Field name="anbefaltTerm" component={InputField} />
    </div>
    <div className="form-group">
      <HelpText
        title={localization.definisjonTitle}
        required={true}
        helpTextAbstract={localization.definisjonAbstract}
        helpTextDescription={localization.definisjonDescription}
      />
      <Field name="definisjon" component={TextAreaField} />
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
      <Field name="merknad" rows="5" component={TextAreaField} />
    </div>
  </div>
);
