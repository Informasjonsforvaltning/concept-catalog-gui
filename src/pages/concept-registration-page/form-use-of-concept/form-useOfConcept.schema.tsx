import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  eksempel: Yup.string()
    .min(2, localization.validationMin2)
    .nullable(),
  fagområde: Yup.string()
    .min(2, localization.validationMin2)
    .nullable(),
  bruksområde: Yup.array().of(Yup.string().min(2, localization.validationMin2)),
  omfang: Yup.object().shape({
    tekst: Yup.string()
      .nullable()
      .min(2, localization.validationMin2),
    uri: Yup.string()
      .nullable()
      .url(localization.validationUrl)
  })
});
