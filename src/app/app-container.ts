import { Container } from 'inversify';
import { Component } from './app-component.js';
import RESTApplication from './rest-app.js';
import { LoggerInterface } from '../common/logger-service/logger.interface.js';
import { ConfigInterface } from '../common/config.service/config.interface.js';
import LoggerService from '../common/logger-service/logger.service.js';
import ConfigService from '../common/config.service/config.service.js';

const appContainer = new Container();
appContainer.bind<RESTApplication>(Component.RESTApplication).to(RESTApplication).inSingletonScope();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
appContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();

export { appContainer };
