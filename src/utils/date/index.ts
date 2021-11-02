import { DateTime } from 'luxon';
import { localization } from '../../lib/localization';

export const formatTime = (timestamp, format): string => {
  if (!timestamp) {
    return '';
  }
  return DateTime.fromISO(timestamp, {
    locale: localization.getLanguage()
  }).toFormat(format);
};
