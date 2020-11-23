import { resolve } from 'react-resolver';
import { publisherApiGet } from '../../api/publisher-api';
import { getConceptsForCatalog } from '../../api/concept-catalogue-api';

const mapProps = {
  concepts: ({ catalogId }) => getConceptsForCatalog(catalogId),
  publisher: ({ catalogId }) => publisherApiGet(`/organizations/${catalogId}`)
};

export const conceptListResolver = resolve(mapProps);
