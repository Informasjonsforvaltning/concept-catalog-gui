import { searchApiGet } from './host';
import { SearchObject } from '../../types';

export const extractSuggestions = (
  searchResponse: any
): Promise<SearchObject[]> => searchResponse.suggestions ?? [];

export const getConceptSuggestions = (params: any) =>
  searchApiGet('/suggestions/concepts', params);
