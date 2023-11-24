import { DateTime } from 'luxon';
import * as Yup from 'yup';
import { localization } from '../../../lib/localization';
import { Relation } from '../../../types/enums';
import { getRevisions } from '../../../api/concept-catalog-api';
import { compareVersion } from '../../../utils/version';

const isValidUrl = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

const tekstMedSpraakKodeArray = Yup.object()
  .nullable()
  .shape({
    nb: Yup.array().of(Yup.string()).nullable(),
    nn: Yup.array().of(Yup.string()).nullable(),
    en: Yup.array().of(Yup.string()).nullable()
  });

const kilde = Yup.array()
  .of(
    Yup.object().shape({
      tekst: Yup.string()
        .nullable()
        .test({
          test(value) {
            const isRequired = this.parent.forholdTilKilde !== 'egendefinert';

            if (isRequired && (!value || value.length < 2)) {
              return this.createError({
                message: localization.validationMin2
              });
            }
            return true;
          }
        }),
      uri: Yup.string()
        .nullable()
        .test({
          test(value) {
            const isRequired = this.parent.forholdTilKilde !== 'egendefinert';

            if (isRequired && !isValidUrl(value)) {
              return this.createError({
                message: localization.validationUrl
              });
            }
            return true;
          }
        })
    })
  )
  .nullable();

export const schema = Yup.object().shape({
  anbefaltTerm: Yup.object().shape({
    navn: Yup.object().shape({
      nb: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({
              message: localization.validationRequired,
              path: this.path
            });
          }
          return true;
        }
      }),
      nn: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({
              message: localization.validationRequired,
              path: this.path
            });
          }
          return true;
        }
      }),
      en: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({
              message: localization.validationRequired,
              path: this.path
            });
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
            return this.createError({
              message: localization.validationRequired,
              path: this.path
            });
          }
          return true;
        }
      }),
      nn: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({
              message: localization.validationRequired,
              path: this.path
            });
          }
          return true;
        }
      }),
      en: Yup.string().test({
        test() {
          const { nb, nn, en } = this.parent;
          if (!nb && !nn && !en) {
            return this.createError({
              message: localization.validationRequired,
              path: this.path
            });
          }
          return true;
        }
      })
    }),
    kildebeskrivelse: Yup.object().nullable().shape({
      forholdTilKilde: Yup.string().nullable(),
      kilde
    })
  }),
  definisjonForAllmennheten: Yup.object()
    .shape({
      kildebeskrivelse: Yup.object().nullable().shape({
        forholdTilKilde: Yup.string().nullable(),
        kilde
      })
    })
    .nullable(),
  definisjonForSpesialister: Yup.object()
    .shape({
      kildebeskrivelse: Yup.object().nullable().shape({
        forholdTilKilde: Yup.string().nullable(),
        kilde
      })
    })
    .nullable(),
  fagområde: tekstMedSpraakKodeArray,
  statusURI: Yup.string().nullable(),
  omfang: Yup.object()
    .nullable()
    .shape({
      tekst: Yup.string().nullable(),
      uri: Yup.string().nullable().url(localization.validationUrl)
    }),
  kontaktpunkt: Yup.object()
    .nullable()
    .shape({
      harEpost: Yup.string().nullable().email(localization.validationEmail),
      harTelefon: Yup.string()
        .nullable()
        .matches(/^\+?(?:[0-9\s]){6,14}[0-9]$/i, {
          message: localization.validationPhone,
          excludeEmptyString: true
        })
    }),
  gyldigFom: Yup.mixed()
    .nullable()
    .test({
      test(value) {
        if (
          value == null ||
          DateTime.fromJSDate(value).isValid ||
          DateTime.fromFormat(value, 'yyyy-MM-dd').isValid
        ) {
          return true;
        }
        return this.createError({
          message: localization.validationDate,
          path: this.path
        });
      }
    }),
  gyldigTom: Yup.mixed()
    .nullable()
    .test({
      test(value) {
        if (
          value == null ||
          DateTime.fromJSDate(value).isValid ||
          DateTime.fromFormat(value, 'yyyy-MM-dd').isValid
        ) {
          return true;
        }
        return this.createError({
          message: localization.validationDate,
          path: this.path
        });
      }
    }),
  seOgså: Yup.array().of(Yup.string().nullable()).nullable(),
  erstattesAv: Yup.array().of(Yup.string().nullable()).nullable(),
  begrepsRelasjon: Yup.array()
    .of(
      Yup.object().shape({
        relasjon: Yup.string().required('Feltet må fylles ut'),
        relasjonsType: Yup.string()
          .nullable()
          .when('relasjon', {
            is: relasjon =>
              relasjon === Relation.PARTITIV || relasjon === Relation.GENERISK,
            then: Yup.string().required()
          }),
        relatertBegrep: Yup.string().required()
      })
    )
    .nullable(),
  versjonsnr: Yup.object()
    .test(
      'version-check',
      'Version must be minimum 0.1.0 and greater than latest published version',
      (value, context) =>
        context.parent.id
          ? getRevisions(context.parent.id)
              .then(revisions => {
                const latestPublishedRevision = revisions.find(
                  rev => rev.erSistPublisert
                );
                return (
                  compareVersion(
                    latestPublishedRevision?.id !== context.parent.id
                      ? latestPublishedRevision?.versjonsnr
                      : null,
                    value as any
                  ) < 0
                );
              })
              .catch(() => false)
          : compareVersion({ major: 0, minor: 1, patch: 0 }, value as any) <= 0
    )
    .shape({
      major: Yup.number(),
      minor: Yup.number(),
      patch: Yup.number()
    })
});
