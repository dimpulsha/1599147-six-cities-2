export interface LoggerInterface {
  error(message: string, ...args: unknown[]): void,
  warning(message: string, ...args: unknown[]): void,
  info(message: string, ...args: unknown[]): void,
  debug(message: string, ...args: unknown[]): void
}
