import _ from 'lodash';
import { resolve } from 'react-resolver';
import { getConcept } from '../../api/concept-registration-api';

const mapProps = {
  concept: async ({ catalogId, conceptId }) => {
    return _.find(await getConcept(`?orgNummer=${catalogId}`), { id: conceptId });
  }
};

export const ConceptRegistrationResolver = resolve(mapProps);
