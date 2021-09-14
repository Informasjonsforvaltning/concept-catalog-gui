import _ from 'lodash';
import { resolve } from 'react-resolver';
import { publisherApiGet } from '../../../api/publisher-api';

const memoizedPublisherApiGetByOrgNr = _.memoize(publisherApiGet);

const mapProps = {
  publisher: props =>
    memoizedPublisherApiGetByOrgNr(
      `/organizations/${_.get(props, ['match', 'params', 'catalogId'])}`
    )
};

export const publisherBreadcrumbResolver = resolve(mapProps);
