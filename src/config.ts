import axios from 'axios';

export interface Config {
  conceptRegistrationApi: {
    host: string;
  };
}

const createConfig = (env): Config => {
  return {
    conceptRegistrationApi: {
      host: env.CONCEPT_REGISTRATION_API || '/'
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
