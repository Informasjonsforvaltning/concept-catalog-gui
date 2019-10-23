/* Facade for keycloak */
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import get from 'lodash/get';
import find from 'lodash/find';
import { loadTokens, removeTokens, storeTokens } from './token-store';
import { getConfig } from '../config';
import { ResourceRole } from '../domain/ResourceRole';

let kc: KeycloakInstance;

export const PERMISSION_READ = 'PERMISSION_READ';

export function initAuth(): Promise<boolean> {
  kc = Keycloak(getConfig().keycloak);

  kc.onAuthSuccess = () => storeTokens({ token: kc.token, refreshToken: kc.refreshToken });
  kc.onAuthRefreshSuccess = kc.onAuthSuccess;
  kc.onAuthError = removeTokens;
  kc.onAuthRefreshError = removeTokens;

  const { token, refreshToken } = loadTokens();

  return new Promise(resolve =>
    kc
      .init({
        onLoad: 'login-required',
        token,
        refreshToken
      })
      .success(resolve)
      .error(err => {
        console.error(err);
        return false;
      })
  );
}

// name missing in types
export const getUserName: () => string = () => get(kc.tokenParsed, 'name');

export async function logout(): Promise<void> {
  removeTokens();
  return new Promise(() => kc.logout().error(console.error));
}

export const getToken: () => Promise<string | undefined> = async () => {
  await new Promise((resolve, reject) =>
    kc
      .updateToken(30)
      .success(resolve)
      .error(reject)
  );
  return kc.token;
};

const extractResourceRoles: (authorities: string) => { resource: string; resourceId: string; role: string }[] = (
  authorities: string
) => {
  return (authorities || '')
    .split(',')
    .map(authorityDescriptor => authorityDescriptor.split(':'))
    .map(parts => ({ resource: parts[0], resourceId: parts[1], role: parts[2] }));
};

export const getResourceRoles: () => { resource: string; resourceId: string; role: string }[] = (): ResourceRole[] =>
  extractResourceRoles(get(kc.tokenParsed, 'authorities'));

export const hasPermissionForResource: ({ resource, resourceId, permission: string }) => boolean = ({
  resource,
  resourceId,
  permission
}) => {
  switch (permission) {
    case PERMISSION_READ: {
      return !!find(getResourceRoles(), { resource, resourceId });
    }
    default: {
      throw new Error('no permission');
    }
  }
};
