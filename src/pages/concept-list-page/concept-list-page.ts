import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptListPagePure } from './concept-list-page-pure';
import { conceptListResolver } from './concept-list-resolver';
import { requirePredicate } from '../../lib/require-predicate';
import { authService } from '../../services/auth-service';
import withConcepts from '../../components/with-concepts';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, 'catalogId'));

const enhance = compose(
  mapRouteParams,
  requirePredicate(
    ({ catalogId }) => authService.hasOrganizationReadPermission(catalogId),
    () => authService.logout()
  ),
  conceptListResolver,
  withConcepts
);
export const ConceptListPage = enhance(ConceptListPagePure);
