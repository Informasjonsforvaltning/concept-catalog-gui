const env = (window as any).env || {
  // use docker
  CONCEPT_REGISTRATION_API: 'http://localhost:8200',
  REGISTRATION_HOST: 'http://localhost:8098',
  SSO_HOST: 'http://localhost:8084',
  ORGANIZATION_API: 'http://localhost:8140'
};

// use ut1
// env.REGISTRATION_HOST = 'https://registrering.it1.fellesdatakatalog.brreg.no';
// env.CONCEPT_REGISTRATION_API = 'https://registrering-begrep-api.it1.fellesdatakatalog.brreg.no';
// env.SSO_HOST = 'https://sso.it1.fellesdatakatalog.brreg.no';
// env.ORGANIZATION_API = 'https://organization-catalogue.it1.fellesdatakatalog.brreg.no';
// env.CONCEPT_API = 'https://www.it1.fellesdatakatalog.brreg.no';

const config = {
  auth: {
    oidcIssuer: `${env.SSO_HOST}/auth/realms/fdk`,
    oidcClientId: 'concept-catalogue-gui'
  },

  // frontend hosts
  registrationHost: env.REGISTRATION_HOST || 'https://registrering.fellesdatakatalog.brreg.no/',

  // api modules
  conceptCatalogueApi: {
    host: env.CONCEPT_REGISTRATION_API || 'https://begrep-registrering.fellesdatakatalog.brreg.no'
  },
  organizationApi: {
    host: env.ORGANIZATION_API || ''
  }
};

export const getConfig = () => config;
