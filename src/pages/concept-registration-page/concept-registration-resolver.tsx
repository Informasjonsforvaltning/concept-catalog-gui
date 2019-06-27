import _ from 'lodash';
import { resolve } from 'react-resolver';
import { getConcept } from '../../api/concept-registration-api';

const memoizedGetConcept = _.memoize(getConcept);

const mapProps = {
  concept: async props => {
    const conceptId = _.get(props, ['match', 'params', 'conceptId']);
    const concepts = await Promise.resolve(memoizedGetConcept(''));
    return _.find(concepts, { id: conceptId });
  }
};

export const ConceptRegistrationResolver = resolve(mapProps);
