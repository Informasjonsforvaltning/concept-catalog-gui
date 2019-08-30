import _ from 'lodash';
import { resolve } from 'react-resolver';
import { conceptCatalogueApiGet } from '../../api/concept-catalogue-api';
import { publisherApiGet } from '../../api/publisher-api';

const memoizedPublisherApiGetByOrgNr = _.memoize(publisherApiGet);

const mapProps = {
  concepts: ({ catalogId }) => conceptCatalogueApiGet(`/begreper?orgNummer=${catalogId}`),
  publisher: ({ catalogId }) => memoizedPublisherApiGetByOrgNr(`/publishers/${catalogId}`)
};

export const conceptListResolver = resolve(mapProps);
