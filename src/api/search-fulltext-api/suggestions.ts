import { searchFullTextApiGet } from './host';
import { SkosConcept } from '../../types';

export const extractSuggestions = (
  searchResponse: any
): Promise<SkosConcept[]> => searchResponse.suggestions ?? [];

export const getConceptSuggestions = (params: any) =>
  searchFullTextApiGet('/suggestion/concepts', params);
