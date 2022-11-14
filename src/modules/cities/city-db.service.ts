//нужны зависимости и контейнер
// DocType & type из typegoose
// модель в зависимостях
// entity & dto
// интерфейс
// логгер

import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Component } from '../../app/app-component.js';
import { CityDatabaseInterface } from './city-db.interface.js';
import { CityEntity } from './city.entity.js';
import CityDTO from './dto/create-city.dto.js';
import { LoggerInterface } from '../../common/logger-service/logger.interface.js';

@injectable()
export default class CityDatabaseService implements CityDatabaseInterface {

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    // вот здесь модель появляется
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) { }

  // не звбывай асинхронность
  public async create(dto: CityDTO): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`create City with name ${dto.name}`);
    return result;
  }

  public async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    const result = await this.cityModel.findOne({ name: name });
    this.logger.debug(`findByName: Found city Id by name ${name}. Id = ${result?.id}`);
    return result;
  }

  public async findIdByName(name: string): Promise<string | null> {
    const result = await this.cityModel.findOne({ name: name });
    this.logger.debug(`findIdByName: Found city Id by name ${name}. Id = ${result?.id}`);
    return result?.id ?? null;
  }

  public async findOrCreate(dto: CityDTO): Promise<DocumentType<CityEntity>> {
    const result = await this.findByName(dto.name);
    if (result) { return result; }
    return this.create(dto);
  }

}
