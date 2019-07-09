import React, { useState } from 'react';
import cx from 'classnames';
import { Form, Field } from 'formik';
import { InputField } from '../field-input/field-input.component';
import { ButtonNewSource } from '../button-new-source/button-new-source.component';

import { localization } from '../../lib/localization';
import './form-source.scss';

interface Props {
  title: string;
  required?: boolean;
  children: object;
}

export const FormSource = ({  }: Props): JSX.Element => {
  return (
    <div>
      {/* SOURCES - LIST */}

      {/* SOURCES - FORM */}
      <Field name="relation" component={InputField} />

      <Field name="title" component={InputField} />

      <Field name="ref" component={InputField} />

      <ButtonNewSource />
    </div>
  );
};
