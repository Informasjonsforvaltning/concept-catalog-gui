import pick from 'lodash/pick';
import { withProps } from 'recompose';
import flowRight from 'lodash/flowRight';

import { ConceptListPagePure } from './concept-list-page-pure';
import { conceptListResolver } from './concept-list-resolver';
import { requirePermissionDecorator } from '../../auth/require-permission-decorator';

const mapRouteParams = withProps(({ match: { params } }) => pick(params, 'catalogId'));

const enhance = flowRight(
  mapRouteParams,
  requirePermissionDecorator({ resource: 'publisher', resourceIdPropName: 'catalogId' }),
  conceptListResolver
);
export const ConceptListPage = enhance(ConceptListPagePure);
