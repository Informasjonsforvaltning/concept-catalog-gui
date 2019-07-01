import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  tillattTerm: Yup.string().min(2, localization.validationMin2),
  frarådetTerm: Yup.string().min(2, localization.validationMin2)
});
