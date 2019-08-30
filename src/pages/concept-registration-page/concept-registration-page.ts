import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptRegistrationPagePure } from './concept-registration-page-pure';
import { conceptRegistrationResolver } from './concept-registration-resolver';
import { requirePermissionDecorator } from '../../auth/require-permission-decorator';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, ['catalogId', 'conceptId']));

const enhance = compose(
  mapRouteParams,
  requirePermissionDecorator({ resource: 'publisher', resourceIdPropName: 'catalogId' }),
  conceptRegistrationResolver
);
export const ConceptRegistrationPage = enhance(ConceptRegistrationPagePure);
