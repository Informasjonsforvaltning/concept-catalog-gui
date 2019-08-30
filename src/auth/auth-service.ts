/* Facade for keycloak */
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { getConfig } from '../config';
import { loadTokens, removeTokens, storeTokens } from './token-store';
import get from 'lodash/get';
import find from 'lodash/find';

let kc: KeycloakInstance;

export function initAuth() {
  kc = Keycloak(getConfig().keycloak);

  kc.onAuthSuccess = () => storeTokens({ token: kc.token, refreshToken: kc.refreshToken });
  kc.onAuthRefreshSuccess = kc.onAuthSuccess;
  kc.onAuthError = removeTokens;
  kc.onAuthRefreshError = removeTokens;

  const { token, refreshToken } = loadTokens();

  return kc.init({
    promiseType: 'native',
    onLoad: 'login-required',
    token,
    refreshToken
  });
}

export const getUserName = () => get(kc.tokenParsed, 'name');

export function logout() {
  removeTokens();
  return kc.logout();
}

export const getToken = async () => {
  await kc.updateToken(5);
  return kc.token;
};

//expand authorities protocol to object structure
const extractResourceRoles = (authorities: string) =>
  authorities
    .split(',')
    .map(authorityDescriptor => authorityDescriptor.split(':'))
    .map(parts => ({ resource: parts[0], resourceId: parts[1], role: parts[2] }));

const getRoles = () => extractResourceRoles(get(kc.tokenParsed, 'authorities'));

export const hasAnyRoleForResource = ({ resource, resourceId }) => !!find(getRoles(), { resource, resourceId });
