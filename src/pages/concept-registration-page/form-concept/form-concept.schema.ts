import { DateTime } from 'luxon';
import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

const tekstMedSpraakKodeArray = Yup.object()
  .nullable()
  .shape({
    nb: Yup.array()
      .of(Yup.string())
      .nullable(),
    nn: Yup.array()
      .of(Yup.string())
      .nullable(),
    en: Yup.array()
      .of(Yup.string())
      .nullable()
  });

const tekstMedSpraakKode = Yup.object()
  .nullable()
  .shape({
    nb: Yup.string(),
    nn: Yup.string(),
    en: Yup.string()
  });

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
  tillattTerm: tekstMedSpraakKodeArray,
  frarådetTerm: tekstMedSpraakKodeArray,
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
      forholdTilKilde: Yup.string().nullable(),
      kilde: Yup.array().of(
        Yup.object().shape({
          tekst: Yup.string().min(2, localization.validationMin2),
          uri: Yup.string().url(localization.validationUrl)
        })
      )
    }),
  merknad: tekstMedSpraakKodeArray,
  eksempel: tekstMedSpraakKodeArray,
  fagområde: tekstMedSpraakKode,
  bruksområde: tekstMedSpraakKodeArray,
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
    }),
  gyldigFom: Yup.string()
    .nullable()
    .test({
      test(value) {
        if (value != null && DateTime.fromFormat(value, 'yyyy-MM-dd').isValid) {
          return true;
        }
        return this.createError({ message: localization.validationDate, path: this.path });
      }
    }),
  gyldigTom: Yup.string()
    .nullable()
    .test({
      test(value) {
        if (value != null && DateTime.fromFormat(value, 'yyyy-MM-dd').isValid) {
          return true;
        }
        return this.createError({ message: localization.validationDate, path: this.path });
      }
    }),
  seOgså: Yup.array()
    .of(Yup.string().nullable())
    .nullable()
});
