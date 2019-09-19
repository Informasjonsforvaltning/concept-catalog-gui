import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  anbefaltTerm: Yup.string()
    .nullable()
    .min(2, localization.validationMin2)
    .required(localization.validationRequired),
  definisjon: Yup.string()
    .nullable()
    .min(2, localization.validationMin2)
    .required(localization.validationRequired),
  kildebeskrivelse: Yup.object()
    .nullable()
    .shape({
      kilde: Yup.array().of(
        Yup.object().shape({
          tekst: Yup.string().min(2, localization.validationMin2),
          uri: Yup.string().url(localization.validationUrl)
        })
      )
    }),
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
  }),
  kontaktpunkt: Yup.object().shape({
    harEpost: Yup.string()
      .nullable()
      .email(localization.validationEmail),
    harTelefon: Yup.string()
      .nullable()
      .matches(/^\+?(?:[0-9\s]){6,14}[0-9]$/i, { message: localization.validationPhone, excludeEmptyString: true })
  })
});
