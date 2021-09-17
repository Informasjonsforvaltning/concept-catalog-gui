import React from 'react';

import { localization } from '../../lib/localization';
import './language-picker.styles.scss';
import { Language } from '../../types';

import SC from './styled';

interface Props {
  languages: Language[];
  toggleInputLanguage: (code: string) => void;
}

export const LanguagePicker = ({
  languages,
  toggleInputLanguage
}: Props): JSX.Element => {
  const shouldDisableLanguage = (code): boolean => {
    const selectedLanguages = languages.filter(({ selected }) => selected);
    return selectedLanguages.length === 1 && selectedLanguages[0].code === code;
  };

  return (
    <div className='language-picker'>
      <p>{`${localization.langChoose}:`}</p>
      <div className='language-button-group'>
        {languages.map(({ code, title, selected }) => (
          <SC.Button
            key={code}
            disabled={shouldDisableLanguage(code)}
            onClick={() => toggleInputLanguage(code)}
            $selected={selected}
          >
            {selected && <SC.Icon />}
            {title}
          </SC.Button>
        ))}
      </div>
    </div>
  );
};
