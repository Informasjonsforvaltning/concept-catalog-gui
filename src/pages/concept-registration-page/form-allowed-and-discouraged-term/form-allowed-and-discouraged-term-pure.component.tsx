import React from 'react';
import { Form, Field } from 'formik';
import { InputTagsField } from '../../../components/field-input-tags/field-input-tags.component';

export const FormAllowedAndDiscouragedPure = (): JSX.Element => (
  <Form>
    <div className="form-group">
      <Field name="tillattTerm" component={InputTagsField} />
      <Field name="frarådetTerm" component={InputTagsField} />
    </div>
  </Form>
);
