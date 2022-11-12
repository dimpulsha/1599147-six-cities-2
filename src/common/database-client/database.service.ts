// moongoose
import mongoose from 'mongoose';
// invercify
import { inject, injectable } from 'inversify';
// logger & container
import { Component } from '../../app/app-component.js';
import { LoggerInterface } from '../logger-service/logger.interface.js';
// interface DB
import { DatabaseInterface } from './database.interface.js';

@injectable()
export default class DatabaseService implements DatabaseInterface {

  constructor(
    @inject(Component.LoggerInterface) private readonly logger:LoggerInterface
  ) { }

  async connect(uri: string): Promise<void> {
    // обернуть чтобы отловить ошибку?
    this.logger.info('Starting connect to DataBase...');
    await mongoose.connect(uri);
    this.logger.info('DataBase connected...');
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('DataBase disconnected...');
  }

}
