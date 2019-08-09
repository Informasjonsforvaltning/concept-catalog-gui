import { resolve } from 'react-resolver';
import { getConcept } from '../../api/concept-registration-api';

const mapProps = {
  concept: async ({ catalogId, conceptId }) =>
    (await getConcept(`?orgNummer=${catalogId}`)).find(concept => concept.id === conceptId)
};

export const ConceptRegistrationResolver = resolve(mapProps);
