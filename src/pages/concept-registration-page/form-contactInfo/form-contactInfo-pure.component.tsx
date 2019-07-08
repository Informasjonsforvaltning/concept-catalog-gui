import React from 'react';
import { Form, Field } from 'formik';
import { localization } from '../../../lib/localization';
import { InputField } from '../../../components/field-input/field-input.component';
import { HelpText } from '../../../components/help-text/help-text.component';

export const FormContactInfoPure = (): JSX.Element => (
  <Form>
    <HelpText
      title={localization.kontaktinformasjonTitle}
      required={false}
      helpTextAbstract={localization.kontaktinformasjonAbstract}
      helpTextDescription={localization.kontaktinformasjonDescription}
    />
    <div className="form-group d-flex">
      <div className="w-50">
        <Field name="email" component={InputField} label={localization.email} showLabel={true} />
      </div>
      <div className="w-50">
        <Field name="hasTelephone" component={InputField} label={localization.phone} showLabel={true} />
      </div>
    </div>
  </Form>
);
