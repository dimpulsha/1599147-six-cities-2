import pino, { Logger } from 'pino';
import { LoggerInterface } from './logger.interface.js';

export default class LoggerService implements LoggerInterface {
  private logger!: Logger;
  // todo - получать лог-левел из конфига
  private static readonly LOG_LEVEL = 'debug';
  // todo - прикрутить вывод в файл и на консоль - сделано!
  // todo - параметры логгера - в конфиг
  private static readonly LOG_FILE = './log/rest.log';

  constructor() {
    const transport = pino.transport({
      targets: [
        { target: 'pino/file', level: LoggerService.LOG_LEVEL, options: { destination: LoggerService.LOG_FILE, mkdir: true, append: false } },
        { target: 'pino-pretty', level: LoggerService.LOG_LEVEL, options: {} },
      ]
    });
    this.logger = pino(transport);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warning(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }
}
