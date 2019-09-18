import React from 'react';
import { Field } from 'formik';
import { InputTagsField } from '../../../../components/field-input-tags/field-input-tags.component';
import { HelpText } from '../../../../components/help-text/help-text.component';
import { localization } from '../../../../lib/localization';

export const FormAllowedAndDiscouragedPure = (): JSX.Element => (
  <div>
    <div className="form-group">
      <HelpText
        title={localization.tillattTermTitle}
        required={false}
        helpTextAbstract={localization.tillattTermAbstract}
        helpTextDescription={localization.tillattTermDescription}
      />
      <Field name="tillattTerm" component={InputTagsField} />
    </div>
    <div className="form-group">
      <HelpText
        title={localization.fraraadetTermTitle}
        required={false}
        helpTextAbstract={localization.fraraadetTermAbstract}
        helpTextDescription={localization.fraraadetTermDescription}
      />
      <Field name="frarådetTerm" component={InputTagsField} />
    </div>
  </div>
);
