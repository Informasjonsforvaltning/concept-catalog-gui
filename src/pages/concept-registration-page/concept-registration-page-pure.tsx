import React from 'react';
import { localization } from '../../lib/localization';
import { FormTemplate } from '../../components/form-template/form-template.component';

interface Props {}

export const ConceptRegistrationPagePure = ({  }: Props): JSX.Element => {
  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-md-2" />
        <div className="col-md-8">
          <FormTemplate title={localization.formTerm} required={true}>
            <div>TODO</div>
          </FormTemplate>
        </div>
      </div>
    </div>
  );
};
