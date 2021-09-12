import pick from 'lodash/pick';
import { compose, withProps } from 'recompose';

import { withRouter } from 'react-router-dom';
import { RelatedConceptsPure } from './related-concepts-pure.component';
import { seeAlsoConceptResolver } from './related-concepts-resolver';

const mapRouteParams = withProps(({ match: { params } }) =>
  pick(params, 'catalogId')
);

const enhance = compose(withRouter, mapRouteParams, seeAlsoConceptResolver);

export const RelatedConcepts = enhance(RelatedConceptsPure);
