import { Container } from 'inversify';
import { Component } from './app-component.js';
import RESTApplication from './rest-app.js';
import { LoggerInterface } from '../common/logger-service/logger.interface.js';
import { ConfigInterface } from '../common/config.service/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import LoggerService from '../common/logger-service/logger.service.js';
import ConfigService from '../common/config.service/config.service.js';
import DatabaseService from '../common/database-client/database.service.js';

const appContainer = new Container();
appContainer.bind<RESTApplication>(Component.RESTApplication).to(RESTApplication).inSingletonScope();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
appContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
appContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();

export { appContainer };
