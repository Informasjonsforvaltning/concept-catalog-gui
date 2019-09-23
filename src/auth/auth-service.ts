/* Facade for keycloak */
import Keycloak, { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { getConfig } from '../config';
import { loadTokens, removeTokens, storeTokens } from './token-store';
import get from 'lodash/get';
import find from 'lodash/find';
import { boolean } from 'yup';

let kc: KeycloakInstance;

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
  await kc.updateToken(5);
  return kc.token;
};

const extractResourceRoles: (authorities: string) => { resource: string; resourceId: string; role: string }[] = (
  authorities: string
) => {
  return authorities
    .split(',')
    .map(authorityDescriptor => authorityDescriptor.split(':'))
    .map(parts => ({ resource: parts[0], resourceId: parts[1], role: parts[2] }));
};

const getRoles: () => { resource: string; resourceId: string; role: string }[] = () =>
  extractResourceRoles(get(kc.tokenParsed, 'authorities'));

export const hasAnyRoleForResource: ({ resource, resourceId }) => boolean = ({ resource, resourceId }) =>
  !!find(getRoles(), { resource, resourceId });
