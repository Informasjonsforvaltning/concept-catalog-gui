import React from 'react';
import { Form, Field } from 'formik';
import { InputField } from '../../../components/field-input/field-input.component';
import { TextAreaField } from '../../../components/field-textarea/field-textarea.component';

export const FormTermPure = (): JSX.Element => (
  <Form>
    <div className="form-group">
      <Field name="anbefaltTerm" component={InputField} />
      <Field name="definisjon" component={TextAreaField} />
    </div>
  </Form>
);
