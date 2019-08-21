import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  kontaktpunkt: Yup.object().shape({
    harEpost: Yup.string()
      .nullable()
      .email(localization.validationEmail),
    harTelefon: Yup.string()
      .nullable()
      .matches(/^\+?(?:[0-9\s]){6,14}[0-9]$/i, { message: localization.validationPhone, excludeEmptyString: true })
  })
});
