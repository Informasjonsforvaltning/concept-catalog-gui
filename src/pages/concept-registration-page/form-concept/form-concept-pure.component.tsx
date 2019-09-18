import React from 'react';
import { Form } from 'formik';
import { FormTermPure } from '../form-term/form-term-pure.component';
import { FormAllowedAndDiscouragedPure } from '../form-allowed-and-discouraged-term/form-allowed-and-discouraged-term-pure.component';
import { FormUseOfTermPure } from '../form-use-of-concept/form-useOfConcept-pure.component';
import { FormContactInfoPure } from '../form-contactInfo/form-contactInfo-pure.component';
import { localization } from '../../../lib/localization';
import { FormTemplate } from '../../../components/form-template/form-template.component';

export const FormConceptPure = (props): JSX.Element => (
  <Form>
    <FormTemplate title={localization.formTerm} required={true}>
      <FormTermPure />
    </FormTemplate>
    <FormTemplate title={localization.formAllowedAndDiscouraged}>
      <FormAllowedAndDiscouragedPure />
    </FormTemplate>
    <FormTemplate title={localization.formUseOfConcept}>
      <FormUseOfTermPure />
    </FormTemplate>
    <FormTemplate title={localization.formContactPoint}>
      <FormContactInfoPure />
    </FormTemplate>
  </Form>
);
