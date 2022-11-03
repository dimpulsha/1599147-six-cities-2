// основной файл приложения
import { LoggerInterface } from '../common/logger-service/logger.interface.js';

export default class RESTApplication {
  private logger!: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;
  }

  //забыл, что приложение асинхронное внутри
  public async init() {
    this.logger.info('Application initialization ...');
  }
}
