//  точка входа. тут создается экземпляр приложения
import RESTApplication from './app/rest-app.js';
import LoggerService from './common/logger-service/logger.service.js';
import ConfigService from './common/config.service/config.service.js';

const logger = new LoggerService;
const config = new ConfigService(logger);

const RESTApp = new RESTApplication(logger, config);

RESTApp.init();

