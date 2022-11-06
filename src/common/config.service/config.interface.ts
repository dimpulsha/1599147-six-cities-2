import { ConfigSchema } from './config.schema.js';

// типом может быть  и ключ из объекта
export interface ConfigInterface {
  getConfigItem<T extends keyof ConfigSchema>(key: T): ConfigSchema[T];
  getConfigAll(): ConfigSchema;
 }
