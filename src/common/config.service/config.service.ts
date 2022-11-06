import { config } from 'dotenv';
import { ConfigInterface } from './config.interface.js';
import { ConfigSchema, configSchema } from './config.schema.js';
import { LoggerInterface } from '../logger-service/logger.interface.js';
import { getErrorMessage } from '../../utils/get-error.js';
// todo - логгер тут нужен

export default class ConfigService implements ConfigInterface {
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;
    const parseConfig = config();// считываем .env
    // если что - кидаем ошибку
    if (parseConfig.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }
    configSchema.load({}); // читаем объект
    try {
    // todo - возможно как-то обработать эту ошибку, чтобы системный лог не вылезал?
      configSchema.validate({ allowed: 'strict', output: this.logger.info });
    } catch (err) {
      this.logger.error(`${getErrorMessage(err)}`);
      throw new Error('Can\'t read all variables in config');
    }
    this.config = configSchema.getProperties(); // читаем все объекты из конфига
    this.logger.info('.env file found and successfully parsed!');
  }

  public getConfigItem<T extends keyof ConfigSchema>(key: T) {
    console.log(this.config);

    return this.config[key];
  }

  public getConfigAll(): ConfigSchema {
    return this.config;
  }

}
