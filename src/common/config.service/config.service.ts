import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Component } from '../../app/app-component.js';
import { ConfigInterface } from './config.interface.js';
import { ConfigSchema, configSchema } from './config.schema.js';
import { LoggerInterface } from '../logger-service/logger.interface.js';
import { getErrorMessage } from '../../utils/get-error.js';

@injectable()
export default class ConfigService implements ConfigInterface {
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
    this.logger = logger;
    const parseConfig = config();// считываем .env
    // если что - кидаем ошибку
    if (parseConfig.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }
    configSchema.load({}); // читаем объект
    try {
      // валидация
    // todo - возможно как-то обработать эту ошибку, чтобы системный лог не вылезал?
      configSchema.validate({ allowed: 'strict', output: this.logger.info });
    } catch (err) {
      this.logger.error(`${getErrorMessage(err)}`);
      throw new Error('Can\'t read all variables in config');
    }
    this.config = configSchema.getProperties(); // читаем все объекты из конфига
    this.logger.info('.env file found and successfully parsed!');
    this.logger.debug(JSON.stringify(this.config));
  }

  public getConfigItem<T extends keyof ConfigSchema>(key: T) {
    this.logger.debug(`Read config param for key: ${key}`);
    return this.config[key];
  }

  public getConfigAll(): ConfigSchema {
    this.logger.debug('Read all config by method \'getConfigAll\'');
    return this.config;
  }
}
