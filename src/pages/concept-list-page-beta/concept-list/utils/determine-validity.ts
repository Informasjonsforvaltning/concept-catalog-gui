import {
  dateStringToDate,
  isDateAfterToday,
  isDateBeforeToday
} from '../../../../lib/date-utils';
import { localization } from '../../../../lib/localization';

export const determineValidity = (validFromIncluding, validToIncluding) => {
  const isExpired = isDateBeforeToday(dateStringToDate(validToIncluding));
  const isWillBeValid = isDateAfterToday(dateStringToDate(validFromIncluding));
  if (isExpired) {
    return localization.expired;
  }
  if (isWillBeValid) {
    return localization.willBeValid;
  }
  return localization.valid;
};
