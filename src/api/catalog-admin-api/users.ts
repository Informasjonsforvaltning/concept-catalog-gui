import { CatalogUsersResponse } from '../../types';
import { catalogAdminApi } from './host';

export const getUsersByCatalogIdApiGet = (
  catalogId: string
): Promise<CatalogUsersResponse> =>
  catalogAdminApi({
    path: `${catalogId}/general/user-list`,
    method: 'GET'
  });
