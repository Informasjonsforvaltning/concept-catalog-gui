import { ConceptStatusesResponse } from '../../types';
import { referenceDataApi } from './host';

export const getConceptStatuses = (): Promise<ConceptStatusesResponse> =>
  referenceDataApi({
    path: `eu/concept-statuses`,
    method: 'GET'
  });
