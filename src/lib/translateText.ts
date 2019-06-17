import _ from 'lodash';
import { localization } from './localization';

export const getTranslateText = (textObj: object, language?: string): string | null => {
  const selectedLanguage = language || localization.getLanguage();
  if (typeof textObj === 'string') {
    return textObj;
  }

  if (textObj === null || typeof textObj !== 'object') {
    return null;
  }

  return (
    textObj[selectedLanguage] ||
    _.get(textObj, selectedLanguage) ||
    _.get(textObj, 'nb') ||
    _.get(textObj, 'no') ||
    _.get(textObj, 'nn') ||
    _.get(textObj, 'en') ||
    null
  );
};
