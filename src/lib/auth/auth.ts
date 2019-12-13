/* Facade for keycloak */
import Keycloak, { KeycloakInitOptions, KeycloakInstance } from 'keycloak-js';

export interface ResourceRole {
  resource: string;
  resourceId: string;
  role: string;
}

export interface AuthConfiguration {
  oidcIssuer: string;
  clientId: string;
  redirectUri: string;
  logoutRedirectUri: string;
}

export interface AuthInitOptions {
  loginRequired: boolean;
}

export interface User {
  username: string;
  name: string;
}

export class Auth {
  private readonly kc: KeycloakInstance<'native'>;

  private readonly conf: AuthConfiguration;

  private initialized = false;

  constructor(conf: AuthConfiguration) {
    const [url, realm] = conf.oidcIssuer.split('/realms/');

    const kcConfig = {
      realm,
      url,
      clientId: conf.clientId
    };

    this.conf = conf;
    this.kc = Keycloak(kcConfig);
  }

  async init({ loginRequired }: AuthInitOptions): Promise<boolean> {
    const initOptions: KeycloakInitOptions = {
      onLoad: loginRequired ? 'login-required' : 'check-sso',
      promiseType: 'native'
    };
    await this.kc.init(initOptions).catch(console.error);
    this.initialized = true;
    return this.isAuthenticated();
  }

  login(): void {
    this.kc.login().catch(console.error);
  }

  logout(): void {
    this.kc.logout({ redirectUri: this.conf.logoutRedirectUri }).catch(console.error);
  }

  isAuthenticated: () => boolean = () => this.kc.authenticated || false;

  getUser(): User | null {
    if (!this.kc.tokenParsed) {
      return null;
    }
    const { user_name: username, name } = this.kc.tokenParsed as any;
    return { username, name };
  }

  getToken: () => Promise<string | undefined> = async () => {
    await this.kc.updateToken(30).catch(() => this.logout());
    return this.kc.token;
  };

  getAuthorizationHeader: () => Promise<string> = async () => `Bearer ${await this.getToken()}`;

  getAuthorities: () => string = () => (this.kc.tokenParsed && (this.kc.tokenParsed as any).authorities) || '';

  getResourceRoles: () => { resource: string; resourceId: string; role: string }[] = (): ResourceRole[] =>
    (this.getAuthorities() || '')
      .split(',')
      .map(authorityDescriptor => authorityDescriptor.split(':'))
      .map(parts => ({ resource: parts[0], resourceId: parts[1], role: parts[2] }));

  hasResourceRole = (r: ResourceRole) =>
    !!this.getResourceRoles().find(
      ({ resource, resourceId, role }) => r.resource === resource && r.resourceId === resourceId && r.role === role
    );

  hasOrganizationRole: ({ orgNr, role }: { orgNr: string; role: string }) => boolean = ({ orgNr, role }) =>
    this.hasResourceRole({ resource: 'organization', resourceId: orgNr, role });

  hasOrganizationRoleIn: ({ orgNr, roles }: { orgNr: string; roles: string[] }) => boolean = ({ orgNr, roles }) =>
    roles.some(role => this.hasOrganizationRole({ orgNr, role }));

  hasOrganizationReadPermission = (orgNr: string) =>
    !!this.getResourceRoles().find(({ resource, resourceId }) => resource === 'organization' && resourceId === orgNr);

  hasOrganizationWritePermission = (orgNr: string) =>
    this.hasOrganizationRoleIn({ orgNr, roles: ['write', 'publish', 'admin'] });

  hasOrganizationPublishPermission = (orgNr: string) =>
    this.hasOrganizationRoleIn({ orgNr, roles: ['publish', 'admin'] });

  hasOrganizationAdminPermission = (orgNr: string) => this.hasOrganizationRole({ orgNr, role: 'admin' });

  hasSystemAdminPermission() {
    return this.hasResourceRole({ resource: 'system', resourceId: 'root', role: 'admin' });
  }
}
