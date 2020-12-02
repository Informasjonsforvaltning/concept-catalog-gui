const env = (window as any).env || {
  // use docker
  CONCEPT_REGISTRATION_API: 'http://localhost:8200',
  REGISTRATION_HOST: 'http://localhost:8098',
  SSO_HOST: 'http://localhost:8084',
  ORGANIZATION_API: 'http://localhost:8140'
};

// use staging
// env.REGISTRATION_HOST = 'https://registrering.staging.fellesdatakatalog.digdir.no';
// env.CONCEPT_REGISTRATION_API = 'https://registrering-begrep-api.staging.fellesdatakatalog.digdir.no';
// env.SSO_HOST = 'https://sso.staging.fellesdatakatalog.digdir.no';
// env.ORGANIZATION_API = 'https://organization-catalogue.staging.fellesdatakatalog.digdir.no';
// env.CONCEPT_API = 'https://www.staging.fellesdatakatalog.digdir.no';
// env.SEARCH_FULLTEXT_HOST = 'https://search.staging.fellesdatakatalog.digdir.no';
// env.SEARCH_HOST = 'https://www.staging.fellesdatakatalog.digdir.no';
// env.ADMIN_GUI_HOST = 'https://admin.staging.fellesdatakatalog.digdir.no';

const config = {
  auth: {
    oidcIssuer: `${env.SSO_HOST}/auth/realms/fdk`,
    oidcClientId: 'concept-catalogue-gui'
  },

  // frontend hosts
  registrationHost: env.REGISTRATION_HOST || 'https://registrering.fellesdatakatalog.digdir.no',

  // api modules
  conceptCatalogueApi: {
    host: env.CONCEPT_REGISTRATION_API || 'https://begrep-registrering.fellesdatakatalog.digdir.no'
  },
  organizationApi: {
    host: env.ORGANIZATION_API || ''
  },

  conceptApi: {
    host: env.CONCEPT_API || 'https://fellesdatakatalog.digdir.no'
  },
  searchFullTextApi: {
    host: env.SEARCH_FULLTEXT_HOST
  },
  searchHost: env.SEARCH_HOST || 'https://fellesdatakatalog.digdir.no',
  adminGui: {
    host: env.ADMIN_GUI_HOST
  }
};

export const getConfig = () => config;
