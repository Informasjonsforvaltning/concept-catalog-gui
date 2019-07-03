import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  eksempel: Yup.string().min(2, localization.validationMin2),
  fagområde: Yup.string().min(2, localization.validationMin2),
  bruksområde: Yup.string().min(2, localization.validationMin2),
  omfangTittel: Yup.string().min(2, localization.validationMin2),
  omfangLenke: Yup.string().url(localization.validationUrl)
});
