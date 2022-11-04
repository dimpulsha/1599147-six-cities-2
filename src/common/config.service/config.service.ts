import { ConfigInterface } from './config.interface.js';
// todo - логгер тут нужен

export default class ConfigService implements ConfigInterface {
  private config: NodeJS.ProcessEnv;

  constructor() {
    this.config = process.env;
  }

  public getConfigItem(key: string): string | undefined {
    // console.log(this.config[key]);
    console.log(this.config);

    return this.config[key];
  }

  // public getConfig() { };
}
