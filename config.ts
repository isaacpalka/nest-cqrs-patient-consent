import * as dotenv from 'dotenv';
import * as pkg from './package.json';

// Load environment variables from .env file
dotenv.config();

const envDevelopmentName = 'development';
const env = process.env.NODE_ENV || envDevelopmentName;
const configs = {
  base: {
    ENV: env,
    DEV: env === envDevelopmentName,
    // General
    NAME: process.env.APP_NAME || pkg.name,
    TITLE: process.env.APP_TITLE || 'Patient Consent App',
    DESCRIPTION:
      process.env.APP_DESCRIPTION || 'Patient Consent API Microservice',
    // API
    PREFIX: process.env.APP_PREFIX || 'v1',
    VERSION: process.env.APP_VERSION || '1.0',
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
    // Server
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: process.env.CONTAINER_PORT || 3000, // internal container port
    EXT_PORT: process.env.APP_PORT,
    // Event Store
    EVENTSTORE_SETTINGS: {
      protocol: process.env.EVENTSTORE_PROTOCOL || 'http',
      hostname: process.env.EVENTSTORE_HOSTNAME || '0.0.0.0',
      tcpPort: process.env.EVENTSTORE_EXT_TCP_PORT || 1113,
      httpPort: process.env.EVENTSTORE_EXT_HTTP_PORT || 2113,
      credentials: {
        username: process.env.EVENTSTORE_CREDENTIALS_USERNAME || 'admin',
        password: process.env.EVENTSTORE_CREDENTIALS_PASSWORD || 'changeit',
      },
      poolOptions: {
        min: process.env.EVENTSTORE_POOLOPTIONS_MIN || 1,
        max: process.env.EVENTSTORE_POOLOPTIONS_MAX || 10,
      },
    },
    PROJECTION_DB_SETTINGS: {
      hostname: process.env.PROJECTIONS_HOSTNAME,
      port: process.env.PROJECTIONS_PORT,
      credentials: {
        username: process.env.PROJECTIONS_CREDENTIALS_USERNAME,
        password: process.env.PROJECTIONS_CREDENTIALS_PASSWORD,
      },
      type: process.env.PROJECTIONS_DB_TYPE,
      database: process.env.PROJECTIONS_DATABASE,
    },
    STORE_STATE_SETTINGS: {
      hostname: process.env.STORE_STATE_HOSTNAME,
      port: process.env.STORE_STATE_PORT,
      credentials: {
        username: process.env.STORE_STATE_USERNAME,
        password: process.env.STORE_STATE_PASSWORD,
      },
      type: process.env.STORE_STATE_DB_TYPE,
      database: process.env.STORE_STATE_DB,
      eventsDb: process.env.STORE_STATE_EVENTS_DB,
    },
  },
  development: {},
  production: {
    PORT: process.env.APP_PORT || 7071,
  },
  test: {
    PORT: 7072,
  },
};
const config = { ...configs.base, ...configs[env] };

export { config };
