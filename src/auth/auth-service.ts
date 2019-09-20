/* Facade for keycloak */
import Keycloak, { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { getConfig } from '../config';
import { loadTokens, removeTokens, storeTokens } from './token-store';
import get from 'lodash/get';
import find from 'lodash/find';

let kc: KeycloakInstance;

export async function initAuth(): Promise<KeycloakInstance> {
  kc = Keycloak(getConfig().keycloak);

  kc.onAuthSuccess = () => storeTokens({ token: kc.token, refreshToken: kc.refreshToken });
  kc.onAuthRefreshSuccess = kc.onAuthSuccess;
  kc.onAuthError = removeTokens;
  kc.onAuthRefreshError = removeTokens;

  const { token, refreshToken } = loadTokens();

  try {
    await kc.init({
      promiseType: 'native',
      onLoad: 'login-required',
      token,
      refreshToken
    });
    return kc;
  } catch (err) {
    console.error('Error initializing keycloak', err);
    throw err;
  }
}

// Contextual typeing -> inferred type
export const getUserName: () => KeycloakTokenParsed = () => get(kc.tokenParsed, 'name');

export async function logout(): Promise<void> {
  removeTokens();
  try {
    await kc.logout();
    return;
  } catch (err) {
    console.error('Failed to log out', err);
    throw err;
  }
}

export const getToken: () => Promise<string | undefined> = async () => {
  await kc.updateToken(5);
  return kc.token;
};

//expand authorities protocol to object structure
// const extractResourceRolesOrg = (authorities: string) =>
//   authorities
//     .split(',')
//     .map(authorityDescriptor => authorityDescriptor.split(':'))
//     .map(parts => ({ resource: parts[0], resourceId: parts[1], role: parts[2] }));

const extractResourceRolesOrg = (authorities: string) =>
  authorities
    .split(',')
    .map(authorityDescriptor => authorityDescriptor.split(':'))
    .map(parts => ({ resource: parts[0], resourceId: parts[1], role: parts[2] }));

const extractResourceRoles: (authorities: string) => {} = (authorities: string) => {
  return authorities
    .split(',')
    .map(authorityDescriptor => authorityDescriptor.split(':'))
    .map(parts => ({ resource: parts[0], resourceId: parts[1], role: parts[2] }));
};

const getRoles: () => {} = () => extractResourceRoles(get(kc.tokenParsed, 'authorities'));

export const hasAnyRoleForResource: ({ resource, resourceId }) => boolean = ({ resource, resourceId }) =>
  !!find(getRoles(), { resource, resourceId });
