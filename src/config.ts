import axios from 'axios';

export interface Config {
  keycloak: any;
  registrationHost: string;
  conceptRegistrationApi: {
    host: string;
  };
  publisherApi: {
    host: string;
    authorization: string;
  };
}

const createConfig = (env): Config => {
  return {
    keycloak: {
      realm: 'fdk',
      url: `${env.SSO_HOST}/auth`,
      clientId: 'concept-catalogue-gui'
    },

    // frontend hosts
    registrationHost: env.REGISTRATION_HOST || 'https://registrering.fellesdatakatalog.brreg.no/',

    // api modules
    conceptRegistrationApi: {
      host: env.CONCEPT_REGISTRATION_API || 'https://begrep-registrering.fellesdatakatalog.brreg.no'
    },
    publisherApi: {
      host: env.PUBLISHER_API || '',
      authorization: env.PUBLISHER_DATA_AUTHORIZATION || undefined
    }
  };
};

const config = createConfig({});

export const getConfig = (): Config => config;

export const loadConfig = async (): Promise<void> => {
  const response = await axios.get('/env.json');
  const env = response.data;

  // override all env variables to ut1
  // Object.assign(env, {
  //   REGISTRATION_HOST:'https://registrering.ut1.fellesdatakatalog.brreg.no',
  //   CONCEPT_REGISTRATION_API:'https://registrering-begrep-api.ut1.fellesdatakatalog.brreg.no',
  //   SSO_HOST:'https://sso.ut1.fellesdatakatalog.brreg.no',
  //   PUBLISHER_API:'https://www.ut1.fellesdatakatalog.brreg.no',
  //   PUBLISHER_DATA_AUTHORIZATION:'Basic ZmRrOkJSUkVH'
  // });

  // override all env variables to local docker
  // Object.assign(env, {
  //   REGISTRATION_HOST:'http://localhost:8098',
  //   CONCEPT_REGISTRATION_API:'http://localhost:8200',
  //   SSO_HOST:'http://localhost:8084',
  //   PUBLISHER_API:'http://localhost:8080',
  // });

  Object.assign(config, createConfig(env));
};
