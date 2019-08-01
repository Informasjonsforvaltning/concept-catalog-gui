import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  kontaktpunkt: Yup.object().shape({
    harEpost: Yup.string().email(localization.validationEmail),
    harTelefon: Yup.string().matches(/^[+]?[(]?[0-9]{4,12}$/i, localization.validationPhone)
  })
});
