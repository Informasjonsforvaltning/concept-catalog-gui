import React from 'react';
import { localization } from '../../lib/localization';

import SC from './styled';

const allowedMimeTypes = [
  'text/csv',
  'text/x-csv',
  'text/plain',
  'application/csv',
  'application/x-csv',
  'application/vnd.ms-excel',
  'application/json'
];

export const ImportConceptButton = ({ onUpload }): JSX.Element | null => (
  <SC.ImportConceptButton
    htmlFor='file-upload'
    aria-haspopup='true'
    aria-expanded='false'
  >
    {localization.importNewConcept}
    <input
      id='file-upload'
      type='file'
      accept={allowedMimeTypes.join(', ')}
      onChange={onUpload}
    />
  </SC.ImportConceptButton>
);

export default ImportConceptButton;
