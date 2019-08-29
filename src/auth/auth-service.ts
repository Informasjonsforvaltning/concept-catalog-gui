/* Facade for keycloak */
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { getConfig } from '../config';
import { loadTokens, removeTokens, storeTokens } from './token-store';

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

export const getUserName = () => kc.tokenParsed && (kc.tokenParsed as any).name;
