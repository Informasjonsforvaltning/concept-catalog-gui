import _ from 'lodash';
import { compose, withProps } from 'recompose';
import { publisherBreadcrumbResolver } from './publisher-breadcrumb-resolver';
import { PublisherBreadcrumbPure } from './publisher-breadcrumb-pure.component';

const mapRouteParams = withProps(({ match: { params } }) => _.pick(params, 'catalogId'));

const enhance = compose(mapRouteParams, publisherBreadcrumbResolver);

export const PublisherBreadcrumb = enhance(PublisherBreadcrumbPure);
