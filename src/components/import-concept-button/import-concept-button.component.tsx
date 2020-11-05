import React from 'react';
import { localization } from '../../lib/localization';
import './import-concept-button.scss';

export const ImportConceptButton = ({ onUpload }): JSX.Element | null => (
  <label
    htmlFor="file-upload"
    aria-haspopup="true"
    aria-expanded="false"
    className="custom-file-upload fdk-button fdk-button-import-concept btn btn-primary mb-4"
  >
    <svg className="fdk-icon-import mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <defs />
      <title>icon-add-cicle-sm</title>
      <g id="outline">
        <circle className="circle" cx="8" cy="8" r="7" />
        <path className="path" d="M11,7H9V5A1,1,0,0,0,7,5V7H5A1,1,0,0,0,5,9H7v2a1,1,0,0,0,2,0V9h2a1,1,0,0,0,0-2Z" />
      </g>
    </svg>
    {localization.importNewConcept}
    <input id="file-upload" type="file" onChange={onUpload} />
  </label>
);

export default ImportConceptButton;
