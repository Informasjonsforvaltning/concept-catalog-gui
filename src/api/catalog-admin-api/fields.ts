import { CatalogFields } from '../../types';
import { catalogAdminApi } from './host';

export const getFieldsByCatalogIdApiGet = (
  catalogId: string
): Promise<CatalogFields> =>
  catalogAdminApi({
    path: `${catalogId}/concepts/fields`,
    method: 'GET'
  });
