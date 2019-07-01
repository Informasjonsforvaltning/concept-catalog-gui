import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  email: Yup.string().email(localization.validationEmail),
  hasTelephone: Yup.string().matches(/^[+]?[(]?[0-9]{4,12}$/i, localization.validationPhone)
});
