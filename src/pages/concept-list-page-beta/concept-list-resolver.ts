import { resolve } from 'react-resolver';
import { publisherApiGet } from '../../api/publisher-api';

const mapProps = {
  publisher: ({ catalogId }) => publisherApiGet(`/organizations/${catalogId}`)
};

export const conceptListResolver = resolve(mapProps);
