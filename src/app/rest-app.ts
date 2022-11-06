// основной файл приложения
import { LoggerInterface } from '../common/logger-service/logger.interface.js';
import { ConfigInterface } from '../common/config.service/config.interface.js';

export default class RESTApplication {
  private logger!: LoggerInterface;
  private config!: ConfigInterface;

  constructor(logger: LoggerInterface, config: ConfigInterface) {
    this.logger = logger;
    this.config = config;
  }

  //public async надо.  забыл, что приложение асинхронное внутри
  public async init() {
    this.logger.info('Application initialization ...');
    console.log(this.config.getConfigAll());
    // this.logger.info(String(this.config.getConfigItem('PAT')));
  }
}
