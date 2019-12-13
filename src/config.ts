const env = (window as any).env || {
  // use docker
  CONCEPT_REGISTRATION_API: 'http://localhost:8200',
  REGISTRATION_HOST: 'http://localhost:8098',
  PUBLISHER_API: 'http://localhost:8080',
  PUBLISHER_DATA_AUTHORIZATION: '',
  // PUBLISHER_API:'https://www.ut1.fellesdatakatalog.brreg.no'
  // PUBLISHER_DATA_AUTHORIZATION:'Basic ZmRrOkJSUkVH' // for ut1 and st1
  SSO_HOST: 'http://localhost:8084'
};

// use ut1
// env.REGISTRATION_HOST = 'https://registrering.ut1.fellesdatakatalog.brreg.no';
// env.CONCEPT_REGISTRATION_API = 'https://registrering-begrep-api.ut1.fellesdatakatalog.brreg.no';
// env.SSO_HOST = 'https://sso.ut1.fellesdatakatalog.brreg.no';
// env.PUBLISHER_API = 'https://www.ut1.fellesdatakatalog.brreg.no';
// env.PUBLISHER_DATA_AUTHORIZATION = 'Basic ZmRrOkJSUkVH';

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
  publisherApi: {
    host: env.PUBLISHER_API || '',
    authorization: env.PUBLISHER_DATA_AUTHORIZATION || undefined
  }
};

export const getConfig = () => config;
