import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptListPagePure } from './concept-list-page-pure';
import { conceptListResolver } from './concept-list-resolver';
import { requirePermissionDecorator } from '../../auth/require-permission-decorator';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, 'catalogId'));

const enhance = compose(
  mapRouteParams,
  requirePermissionDecorator({ resource: 'publisher', resourceIdPropName: 'catalogId' }),
  conceptListResolver
);
export const ConceptListPage = enhance(ConceptListPagePure);
