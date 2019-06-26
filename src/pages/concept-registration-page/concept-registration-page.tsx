import _ from 'lodash';
import { compose, withProps } from 'recompose';

import { ConceptRegistrationPagePure } from './concept-registration-page-pure';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, ['catalogId', 'conceptId']));

const enhance = compose(mapRouteParams);
export const ConceptRegistrationPage = enhance(ConceptRegistrationPagePure);
