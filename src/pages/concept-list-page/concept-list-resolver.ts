import _ from 'lodash';
import { resolve } from 'react-resolver';
import { publisherApiGet } from '../../api/publisher-api';
import { getConceptsForCatalog } from '../../api/concept-catalogue-api';

const memoizedPublisherApiGetByOrgNr = _.memoize(publisherApiGet);

const mapProps = {
  concepts: ({ catalogId }) => getConceptsForCatalog(catalogId),
  publisher: ({ catalogId }) => memoizedPublisherApiGetByOrgNr(`/publishers/${catalogId}`)
};

export const conceptListResolver = resolve(mapProps);
