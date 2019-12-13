import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptListPagePure } from './concept-list-page-pure';
import { conceptListResolver } from './concept-list-resolver';
import { hasPermissionForResource, logout, PERMISSION_READ } from '../../auth/auth-service';
import { requirePredicate } from '../../lib/require-predicate';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, 'catalogId'));

const enhance = compose(
  mapRouteParams,
  requirePredicate(
    ({ catalogId }) =>
      hasPermissionForResource({
        resource: 'organization',
        resourceId: catalogId,
        permission: PERMISSION_READ
      }),
    () => logout()
  ),
  conceptListResolver
);
export const ConceptListPage = enhance(ConceptListPagePure);
