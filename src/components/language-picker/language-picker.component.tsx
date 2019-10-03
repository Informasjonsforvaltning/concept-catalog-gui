import React from 'react';
import cx from 'classnames';
import { Button } from 'reactstrap';

import { localization } from '../../lib/localization';
import './language-picker.styles.scss';
import { Language } from '../../domain/Language';

interface Props {
  languages: Language[];
  toggleInputLanguage: Function;
}

export const LanguagePicker = ({ languages, toggleInputLanguage }: Props): JSX.Element => {
  const shouldDisableLanguage = (code): boolean => {
    const selectedLanguages = languages.filter(({ selected }) => selected);
    return selectedLanguages.length === 1 && selectedLanguages[0].code === code;
  };

  return (
    <div className="language-picker">
      <p>{`${localization.langChoose}:`}</p>
      <div className="language-button-group">
        {languages.map(({ code, title, selected }) => (
          <Button
            key={code}
            className={cx('fdk-button border-0', {
              'fdk-bg-color-primary-lighter': !selected,
              'fdk-color-link-darker': !selected,
              'no-shadow': selected
            })}
            color={shouldDisableLanguage(code) ? 'secondary' : 'primary'}
            disabled={shouldDisableLanguage(code)}
            onClick={() => toggleInputLanguage(code)}
          >
            {selected && <img src="./img/icon-checked-white-sm.svg" alt="icon" />}
            {title}
          </Button>
        ))}
      </div>
    </div>
  );
};
