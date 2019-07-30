import React from 'react';

import { localization } from '../../lib/localization';
import { FormTemplate } from '../../components/form-template/form-template.component';
import { FormTerm } from './form-term/form-term.component';
import { FormAllowedAndDiscouraged } from './form-allowed-and-discouraged-term/form-allowed-and-discouraged-term.component';
import { FormUseOfTerm } from './form-use-of-concept/form-useOfConcept.component';
import { FormContactInfo } from './form-contactInfo/form-contactInfo.component';

interface Props {
  concept: object;
}

export const ConceptRegistrationPagePure = ({ concept }: Props): JSX.Element => {
  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-12">
          <FormTemplate title={localization.formTerm} required={true}>
            <FormTerm concept={concept} />
          </FormTemplate>
          <FormTemplate title={localization.formAllowedAndDiscouraged}>
            <FormAllowedAndDiscouraged concept={concept} />
          </FormTemplate>
          <FormTemplate title={localization.formUseOfConcept}>
            <FormUseOfTerm concept={concept} />
          </FormTemplate>
          <FormTemplate title={localization.formContactPoint}>
            <FormContactInfo concept={concept} />
          </FormTemplate>
        </div>
      </div>
    </div>
  );
};
