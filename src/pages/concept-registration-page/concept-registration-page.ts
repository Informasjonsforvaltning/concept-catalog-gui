import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptRegistrationPagePure } from './concept-registration-page-pure';
import { ConceptRegistrationResolver } from './concept-registration-resolver';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, ['catalogId', 'conceptId']));

const enhance = compose(
  mapRouteParams,
  ConceptRegistrationResolver
);
export const ConceptRegistrationPage = enhance(ConceptRegistrationPagePure);
