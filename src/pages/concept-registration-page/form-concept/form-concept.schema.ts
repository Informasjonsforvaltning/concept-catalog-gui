import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  anbefaltTerm: Yup.object().shape({
    navn: Yup.object().shape({
      nb: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({ message: localization.validationRequired, path: this.path });
          }
          return true;
        }
      }),
      nn: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({ message: localization.validationRequired, path: this.path });
          }
          return true;
        }
      }),
      en: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({ message: localization.validationRequired, path: this.path });
          }
          return true;
        }
      })
    })
  }),
  definisjon: Yup.object().shape({
    tekst: Yup.object().shape({
      nb: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({ message: localization.validationRequired, path: this.path });
          }
          return true;
        }
      }),
      nn: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({ message: localization.validationRequired, path: this.path });
          }
          return true;
        }
      }),
      en: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({ message: localization.validationRequired, path: this.path });
          }
          return true;
        }
      })
    })
  }),
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
  omfang: Yup.object()
    .nullable()
    .shape({
      tekst: Yup.string().nullable(),
      uri: Yup.string()
        .nullable()
        .url(localization.validationUrl)
    }),
  kontaktpunkt: Yup.object()
    .nullable()
    .shape({
      harEpost: Yup.string()
        .nullable()
        .email(localization.validationEmail),
      harTelefon: Yup.string()
        .nullable()
        .matches(/^\+?(?:[0-9\s]){6,14}[0-9]$/i, { message: localization.validationPhone, excludeEmptyString: true })
    })
});
