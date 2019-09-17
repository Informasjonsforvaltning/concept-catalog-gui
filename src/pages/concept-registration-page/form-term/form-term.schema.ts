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
  kildebeskrivelse: Yup.object().shape({
    kilde: Yup.array().of(
      Yup.object().shape({
        tekst: Yup.string().min(2, localization.validationMin2),
        uri: Yup.string().url(localization.validationUrl)
      })
    )
  })
});
