import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { OverviewPagePure } from './overview-page-pure';
import { requirePredicate } from '../../lib/require-predicate';
import { authService } from '../../services/auth-service';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params));

const enhance = compose(
  mapRouteParams,
  requirePredicate(
    () => authService.isAuthenticated(),
    () => authService.logout()
  )
);
export const OverviewPage = enhance(OverviewPagePure);
