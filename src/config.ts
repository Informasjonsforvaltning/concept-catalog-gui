import axios from 'axios';

export interface Config {
  conceptRegistrationApi: {
    host: string;
  };
  publisherApi: {
    host: string;
    headers: {
      authorization: string;
    };
  };
  registrationHost: {
    hostname: string;
  };
}

const createConfig = (env): Config => {
  return {
    conceptRegistrationApi: {
      host: env.CONCEPT_REGISTRATION_API || '/'
    },
    publisherApi: {
      host: env.PUBLISHER_API || '/',
      headers: {
        authorization: env.PUBLISHER_DATA_AUTHORIZATION || undefined
      }
    },
    registrationHost: {
      hostname: env.REGISTRATION_HOSTNAME || 'registrering.fellesdatakatalog.brreg.no'
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
