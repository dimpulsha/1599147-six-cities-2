//  точка входа. тут создается экземпляр приложения
import RESTApplication from './app/rest-app.js';
import LoggerService from './common/logger-service/logger.service.js';

const logger = new LoggerService;

const RESTApp = new RESTApplication(logger);

RESTApp.init();

