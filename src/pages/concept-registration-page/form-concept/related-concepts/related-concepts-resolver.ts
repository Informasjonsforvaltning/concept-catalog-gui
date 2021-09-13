import { resolve } from 'react-resolver';
import {
  extractConcepts,
  paramsToSearchBody,
  searchConcepts
} from '../../../../api/search-fulltext-api/concepts';
import { getConcept } from '../../../../api/concept-catalogue-api';
import { Concept } from '../../../../types';

const mapProps = {
  seeAlsoConcepts: async props => {
    const { conceptId } = props.match.params;
    const concept: Concept = await getConcept(conceptId);
    return Promise.resolve(
      concept.seOgså.length > 0
        ? searchConcepts(
            paramsToSearchBody({ identifier: concept.seOgså })
          ).then(extractConcepts)
        : []
    );
  }
};

export const seeAlsoConceptResolver = resolve(mapProps);
