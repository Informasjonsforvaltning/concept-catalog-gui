import * as Yup from 'yup';
import { localization } from '../../../lib/localization';

export const schema = Yup.object().shape({
  anbefaltTerm: Yup.string()
    .min(2, localization.validationMin2)
    .required(localization.validationRequired),
  definisjon: Yup.string()
    .min(2, localization.validationMin2)
    .required(localization.validationRequired)
});
