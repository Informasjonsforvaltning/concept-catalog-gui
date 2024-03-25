import { searchApiPost } from './host';
import { Concept, SearchObject } from '../../types';

export const searchConcepts = (body: any) =>
  searchApiPost('/search/concepts', body);

const mapFilters = ({ uri }: any) => {
  if (uri) {
    return { uri: { value: uri } };
  }

  return undefined;
};

export const paramsToSearchBody = ({ q, ...params }: any) => {
  const body = {
    query: q,
    filters: mapFilters(params)
  };
  return body;
};

export const extractConcepts = (searchResponse: any): Promise<SearchObject[]> =>
  searchResponse?.hits ?? [];

export const extractInternalConcepts = (
  searchResponse: any
): Promise<Concept[]> => searchResponse?.hits ?? [];
