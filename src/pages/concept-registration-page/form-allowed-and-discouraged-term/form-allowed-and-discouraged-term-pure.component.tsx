import React from 'react';
import { Form, Field } from 'formik';
import { InputTagsField } from '../../../components/field-input-tags/field-input-tags.component';
import { HelpText } from '../../../components/help-text/help-text.component';
import { localization } from '../../../lib/localization';

export const FormAllowedAndDiscouragedPure = (): JSX.Element => (
  <Form>
    <div className="form-group">
      <Field name="tillattTerm" component={InputTagsField} />
      <Field name="frarådetTerm" component={InputTagsField} />
    </div>
  </Form>
);
