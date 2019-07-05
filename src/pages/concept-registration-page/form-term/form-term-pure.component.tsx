import React from 'react';
import { Form, Field } from 'formik';
import { InputField } from '../../../components/field-input/field-input.component';
import { TextAreaField } from '../../../components/field-textarea/field-textarea.component';
import { HelpText } from '../../../components/help-text/help-text.component';
import { localization } from '../../../lib/localization';

export const FormTermPure = (): JSX.Element => (
  <Form>
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
      <HelpText title={localization.definisjonTitle} required={true} />
      <Field name="definisjon" component={TextAreaField} />
    </div>
  </Form>
);
