import { searchFullTextApiPost } from './host';
import { SkosConcept } from '../../types';

export const searchConcepts = (body: any) =>
  searchFullTextApiPost('/concepts', body);

const mapFilters = ({ identifier }: any) => {
  const filters: any = [];
  if (identifier) {
    filters.push({
      collection: {
        field: 'identifier.keyword',
        values: identifier
      }
    });
  }

  return filters.length > 0 ? filters : undefined;
};

export const paramsToSearchBody = ({ q, ...params }: any) => {
  const body = {
    q,
    filters: mapFilters(params)
  };
  return body;
};

export const extractConcepts = (searchResponse: any): Promise<SkosConcept[]> =>
  searchResponse?.hits ?? [];
