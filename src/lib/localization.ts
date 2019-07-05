import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import { nb } from '../l10n/nb';
import { en } from '../l10n/en';

import { helptextsNb } from '../l10n/helptexts.nb';

interface LocaleStrings extends LocalizedStringsMethods {
  [key: string]: any;
}

export const localization: LocaleStrings = new LocalizedStrings({
  nb: { ...nb, ...helptextsNb },
  en
});

localization.setLanguage('nb');
