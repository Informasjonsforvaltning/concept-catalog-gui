import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptRegistrationPagePure } from './concept-registration-page-pure';
import { conceptRegistrationResolver } from './concept-registration-resolver';
import { hasPermissionForResource, logout, PERMISSION_READ } from '../../auth/auth-service';
import { requirePredicate } from '../../lib/require-predicate';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, ['catalogId', 'conceptId']));

const enhance = compose(
  mapRouteParams,
  requirePredicate(
    ({ catalogId }) =>
      hasPermissionForResource({ resource: 'organization', resourceId: catalogId, permission: PERMISSION_READ }),
    () => logout()
  ),
  conceptRegistrationResolver
);
export const ConceptRegistrationPage = enhance(ConceptRegistrationPagePure);
