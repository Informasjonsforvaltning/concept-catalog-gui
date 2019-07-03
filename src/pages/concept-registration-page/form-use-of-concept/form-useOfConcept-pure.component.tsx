import React from 'react';
import { Form, Field } from 'formik';
import { InputField } from '../../../components/field-input/field-input.component';
import { TextAreaField } from '../../../components/field-textarea/field-textarea.component';
import { localization } from '../../../lib/localization';

export const FormUseOfTermPure = (): JSX.Element => (
  <Form>
    <div className="form-group">
      <Field name="eksempel" component={TextAreaField} />
      <Field name="fagområde" component={InputField} />
      <Field name="bruksområde" component={InputField} />
      <div className="d-flex">
        <div className="w-50">
          <Field name="omfangTittel" component={InputField} label={localization.titleScope} showLabel={true} />
        </div>
        <div className="w-50">
          <Field name="omfangLenke" component={InputField} label={localization.linkScope} showLabel={true} />
        </div>
      </div>
    </div>
  </Form>
);
