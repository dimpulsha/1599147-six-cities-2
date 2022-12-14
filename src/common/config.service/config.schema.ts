import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  HOST: string;
  PORT: number;
  DATABASE_URL: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PWD: string;
  UPLOAD_DIRECTORY: string;
  STATIC_DIRECTORY: string;
  SALT: string;
  JWT_SECRET: string,
  LOG_LEVEL: string,
  LOG_FILE: string
 }

export const configSchema = convict<ConfigSchema>({
  HOST: {
    doc: 'Application server host',
    format: String,
    env: 'REST_HOST',
    default: 'localhost'
  },
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'REST_PORT',
    default: 4390
  },
  DATABASE_URL: {
    doc: 'IP address for database connections',
    format: 'ipaddress',
    env: 'REST_DATABASE_URL',
    default: '127.0.0.1'
  },
  DATABASE_PORT: {
    doc: 'Port for database connections',
    format: 'port',
    env: 'REST_DATABASE_PORT',
    default: null
  },
  DATABASE_NAME: {
    doc: 'Database name',
    format: String,
    env: 'REST_DATABASE_NAME',
    default: 'test'
  },
  DATABASE_USER: {
    doc: 'Database username',
    format: String,
    env: 'REST_DATABASE_USER',
    default: null
  },
  DATABASE_PWD: {
    doc: 'Database user password',
    format: String,
    env: 'REST_DATABASE_PWD',
    default: null
  },
  UPLOAD_DIRECTORY: {
    doc: 'Path to upload image',
    format: String,
    env: 'REST_UPLOAD_DIRECTORY',
    default: 'upload-img'
  },
  STATIC_DIRECTORY: {
    doc: 'Path to static image',
    format: String,
    env: 'REST_STATIC_DIRECTORY',
    default: 'static'
  },
  SALT: {
    doc: 'Random value for security',
    format: String,
    env: 'REST_SALT',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret key for JWT',
    format: String,
    env: 'REST_JWT_SECRET',
    default: null
  },
  LOG_LEVEL: {
    doc: 'Log level for logger',
    format: String,
    env: 'REST_LOG_LEVEL',
    default: 'debug'
  },
  LOG_FILE: {
    doc: 'Path and filename for log file',
    format: String,
    env: 'REST_LOG_FILE',
    default: './log/rest.log'
  }
});
// './log/rest.log'
