import React from 'react';

// import { localization } from '../../lib/localization';
import { Language } from '../../types';

import { Checkbox } from '../checkbox';

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
    <SC.LanguagePicker>
      {languages.map(({ code, title, selected }) => (
        <SC.Label htmlFor={code}>
          <Checkbox
            id={code}
            title={code}
            checked={selected}
            disabled={shouldDisableLanguage(code)}
            onChange={() => toggleInputLanguage(code)}
          />
          <>
            <span>{title}</span>
          </>
        </SC.Label>
      ))}
    </SC.LanguagePicker>
  );
};
