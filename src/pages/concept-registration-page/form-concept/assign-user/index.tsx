import React from 'react';
import { Field } from 'formik';
import { localization } from '../../../../lib/localization';
import { InputField } from '../../../../components/fields/field-input/field-input.component';

import SC from './styled';

export const AssignUser = (): JSX.Element => (
  <SC.AssignUser>
    <Field
      name='tildeltBruker.id'
      component={InputField}
      label={localization.assignToUser}
      showLabel
    />
  </SC.AssignUser>
);
