import React, { FC, memo } from 'react';

import { ConceptStatus } from '../../types/enums';

import { localization } from '../../lib/localization';

import SC from './styled';

interface Props {
  isFormDirty: boolean;
  status: string;
  erSistPublisert: boolean | undefined | null;
  createNewConceptRevisionAndNavigate: () => void;
}

const FormControl: FC<Props> = ({
  isFormDirty,
  status,
  erSistPublisert = false,
  createNewConceptRevisionAndNavigate
}) => (
  <SC.FormControl>
    {isFormDirty && status === ConceptStatus.PUBLISERT && erSistPublisert && (
      <SC.Button onClick={createNewConceptRevisionAndNavigate}>
        {localization.saveDraft}
      </SC.Button>
    )}
  </SC.FormControl>
);

export default memo(FormControl);
