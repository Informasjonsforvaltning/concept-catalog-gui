import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptRegistrationPagePure } from './concept-registration-page-pure';
import { conceptRegistrationResolver } from './concept-registration-resolver';
import { requirePredicate } from '../../lib/require-predicate';
import { authService } from '../../services/auth-service';

const mapRouteParams = withProps(({ match: { params } }) =>
  _.pick(params, ['catalogId', 'conceptId'])
);

const enhance = compose(
  mapRouteParams,
  requirePredicate(
    ({ catalogId }) => authService.hasOrganizationReadPermission(catalogId),
    () => authService.logout()
  ),
  conceptRegistrationResolver
);
export const ConceptRegistrationPage = enhance(ConceptRegistrationPagePure);
