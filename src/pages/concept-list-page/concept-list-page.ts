import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptListPagePure } from './concept-list-page-pure';
import { conceptListResolver } from './concept-list-resolver';
import { requirePermissionDecorator } from '../../auth/require-permission-decorator';
import { PERMISSION_READ } from '../../auth/auth-service';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, 'catalogId'));

const enhance = compose(
  mapRouteParams,
  requirePermissionDecorator({
    resource: 'organization',
    resourceIdPropName: 'catalogId',
    permission: PERMISSION_READ
  }),
  conceptListResolver
);
export const ConceptListPage = enhance(ConceptListPagePure);
