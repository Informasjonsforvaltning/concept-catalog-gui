import { resolve } from 'react-resolver';
import { getConcept } from '../../api/concept-catalogue-api';

const mapProps = {
  concept: async ({ conceptId }) => await getConcept(conceptId)
};

export const conceptRegistrationResolver = resolve(mapProps);
