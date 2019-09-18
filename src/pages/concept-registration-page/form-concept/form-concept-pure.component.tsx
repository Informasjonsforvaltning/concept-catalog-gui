import React from 'react';
import { Form } from 'formik';
import { Term } from './term/term.component';
import { AllowedAndDiscouraged } from './allowed-and-discouraged-term/allowed-and-discouraged-term.component';
import { UseOfTerm } from './use-of-concept/useOfConcept.component';
import { ContactInfo } from './contactInfo/contactInfo.component';
import { localization } from '../../../lib/localization';
import { FormTemplate } from '../../../components/form-template/form-template.component';

export const FormConceptPure = (props): JSX.Element => (
  <Form>
    <FormTemplate title={localization.formTerm} required={true}>
      <Term />
    </FormTemplate>
    <FormTemplate title={localization.formAllowedAndDiscouraged}>
      <AllowedAndDiscouraged />
    </FormTemplate>
    <FormTemplate title={localization.formUseOfConcept}>
      <UseOfTerm />
    </FormTemplate>
    <FormTemplate title={localization.formContactPoint}>
      <ContactInfo />
    </FormTemplate>
  </Form>
);
