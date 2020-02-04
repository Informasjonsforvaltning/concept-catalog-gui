import { resolve } from 'react-resolver';
import { extractConcepts, searchConcepts } from '../../../../api/search-portal-api';
import { getConcept } from '../../../../api/concept-catalogue-api';
import { Concept } from '../../../../domain/Concept';

const mapProps = {
  seeAlsoConcepts: async props => {
    const { conceptId } = props.match.params;
    const concept: Concept = await getConcept(conceptId);
    return Promise.resolve(
      concept.seOgså.length > 0
        ? searchConcepts({
            identifiers: concept.seOgså.join(','),
            returnfields: 'identifier,prefLabel'
          }).then(extractConcepts)
        : []
    );
  }
};

export const seeAlsoConceptResolver = resolve(mapProps);
