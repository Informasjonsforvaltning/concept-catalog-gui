import axios from 'axios';

export interface Config {
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
  Object.assign(config, createConfig(env));
};
