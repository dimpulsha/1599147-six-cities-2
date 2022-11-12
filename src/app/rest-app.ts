// основной файл приложения
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Component } from './app-component.js';
import { LoggerInterface } from '../common/logger-service/logger.interface.js';
import { ConfigInterface } from '../common/config.service/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { createMongoURI } from '../utils/create-uri.js';

@injectable()
export default class RESTApplication {

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface,
    @inject(Component.DatabaseInterface) private readonly database: DatabaseInterface) {
  }

  //public async надо.  забыл, что приложение асинхронное внутри
  public async init() {
    this.logger.info('Application initialization ...');
    this.logger.info(`Get value from env $PORT: ${(this.config.getConfigItem('PORT'))}`);
    const allConfig = this.config.getConfigAll();
    const dbURI = createMongoURI(allConfig.DATABASE_USER, allConfig.DATABASE_PWD, allConfig.DATABASE_URL, allConfig.DATABASE_PORT, allConfig.DATABASE_NAME);
    await this.database.connect(dbURI);

    // await this.database.disconnect();
    // console.log(this.config.getConfigAll().DATABASE_NAME);

  }
}
