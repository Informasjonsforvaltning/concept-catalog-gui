import React from 'react';
import { localization } from '../../lib/localization';
import { ReactComponent as IconAdd } from '../../assets/img/icon-add-cicle-sm.svg';
import './add-concept-button.scss';

export const AddConceptButton = ({ parentOnClick }): JSX.Element | null => (
  <button
    type='button'
    aria-haspopup='true'
    aria-expanded='false'
    className='fdk-button fdk-button-add-concept btn btn-primary mb-4'
    onClick={parentOnClick}
  >
    <IconAdd className='fdk-icon-import mr-2' />
    {localization.addNewConcept}
  </button>
);

export default AddConceptButton;
