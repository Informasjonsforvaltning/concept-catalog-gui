import _ from 'lodash';
import { resolve } from 'react-resolver';
import { registrationApiGet } from '../../api/concept-catalogue-api';
import { publisherApiGet } from '../../api/publisher-api';

const memoizedPublisherApiGetByOrgNr = _.memoize(publisherApiGet);

const mapProps = {
  concepts: props => registrationApiGet(`/begreper?orgNummer=${_.get(props, ['match', 'params', 'catalogId'])}`),
  publisher: props => memoizedPublisherApiGetByOrgNr(`/publishers/${_.get(props, ['match', 'params', 'catalogId'])}`)
};

export const conceptListResolver = resolve(mapProps);
