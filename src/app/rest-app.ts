// основной файл приложения
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Component } from './app-component.js';
import { LoggerInterface } from '../common/logger-service/logger.interface.js';
import { ConfigInterface } from '../common/config.service/config.interface.js';

@injectable()
export default class RESTApplication {
  private logger!: LoggerInterface;
  private config!: ConfigInterface;

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) config: ConfigInterface) {
    this.logger = logger;
    this.config = config;
  }

  //public async надо.  забыл, что приложение асинхронное внутри
  public async init() {
    this.logger.info('Application initialization ...');
    this.logger.info(`Get value from env $PORT: ${(this.config.getConfigItem('PORT'))}`);
  }
}
