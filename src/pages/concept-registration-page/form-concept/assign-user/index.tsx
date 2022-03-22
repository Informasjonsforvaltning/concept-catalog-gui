import React from 'react';
import { Field } from 'formik';
import { localization } from '../../../../lib/localization';
import { InputField } from '../../../../components/fields/field-input/field-input.component';
import { HelpText } from '../../../../components/help-text/help-text.component';

import SC from './styled';

export const AssignUser = (): JSX.Element => (
  <SC.AssignUser>
    <SC.InformationHeader>{localization.internalInfo}</SC.InformationHeader>
    <SC.Information>
      <span>{localization.internalSubText}</span>
    </SC.Information>
    <HelpText
      title={localization.assignUserTitle}
      helpTextAbstract={localization.assignUserAbstract}
    />
    <Field
      name='tildeltBruker.id'
      component={InputField}
      label={localization.assignToUser}
      placeholder={localization.enterFullName}
      showLabel
    />
  </SC.AssignUser>
);
