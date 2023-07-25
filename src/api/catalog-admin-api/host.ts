import axios from 'axios';

import { getConfig } from '../../config';
import { authService } from '../../services/auth-service';

interface Props {
  path: string;
  method: any;
  params?: any;
  data?: any;
}

export const catalogAdminApi = async ({ path, method, params, data }: Props) =>
  axios({
    url: `${getConfig().catalogAdminServiceBaseUri}/${path}`,
    method,
    params,
    data,
    headers: {
      Authorization: await authService.getAuthorizationHeader()
    }
  }).then(response => response.data);
