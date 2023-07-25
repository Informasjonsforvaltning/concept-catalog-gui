import { CodeListResponse } from '../../types';
import { catalogAdminApi } from './host';

export const getCodeListsByCatalogIdApiGet = (
  catalogId: string
): Promise<CodeListResponse> =>
  catalogAdminApi({
    path: `${catalogId}/concepts/code-lists`,
    method: 'GET'
  });
