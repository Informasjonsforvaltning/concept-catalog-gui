import React from 'react';
import { Field } from 'formik';
import { localization } from '../../../../lib/localization';
import { InputField } from '../../../../components/field-input/field-input.component';
import { HelpText } from '../../../../components/help-text/help-text.component';

export const FormContactInfoPure = (): JSX.Element => (
  <div>
    <div className="form-group">
      <HelpText
        title={localization.kontaktinformasjonTitle}
        required={false}
        helpTextAbstract={localization.kontaktinformasjonAbstract}
        helpTextDescription={localization.kontaktinformasjonDescription}
      />
      <div className="d-flex">
        <div className="w-50">
          <Field name="kontaktpunkt.harEpost" component={InputField} label={localization.email} showLabel={true} />
        </div>
        <div className="w-50">
          <Field name="kontaktpunkt.harTelefon" component={InputField} label={localization.phone} showLabel={true} />
        </div>
      </div>
    </div>
  </div>
);
