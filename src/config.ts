import axios from 'axios';

export interface Config {
  conceptRegistrationApi: {
    host: string;
  };
  publisherApi: {
    host: string;
    authorization: string;
  };
  registrationHost: {
    host: string;
  };
}

const createConfig = (env): Config => {
  return {
    conceptRegistrationApi: {
      host: env.CONCEPT_REGISTRATION_API || ''
    },
    publisherApi: {
      host: env.PUBLISHER_API || '',
      authorization: env.PUBLISHER_DATA_AUTHORIZATION || undefined
    },
    registrationHost: {
      host: env.REGISTRATION_HOST || undefined
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
