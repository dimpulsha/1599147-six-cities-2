import { inject, injectable } from 'inversify';
import { types, DocumentType } from '@typegoose/typegoose';
import { Component } from '../../app/app-component.js';
import FeatureDTO from './dto/create-feature.dto.js';
import { FeatureEntity } from './feature.entity.js';
import { FeatureDatabaseInterface } from './feature-db.interface';
import { LoggerInterface } from '../../common/logger-service/logger.interface.js';

@injectable()
export default class FeatureDatabaseService implements FeatureDatabaseInterface {

  constructor(
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<FeatureEntity>,
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface
  ) {}

  public async create(dto: FeatureDTO): Promise<DocumentType<FeatureEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New feature created: ${dto.name}`);
    return result;
  }

  public async findByName(name: string): Promise<DocumentType<FeatureEntity> | null> {
    const result = await this.cityModel.findOne({ name: name });
    this.logger.debug(`findByName: Found feature Id by name ${name}. Id = ${result?.id}`);
    return result;
  }

  public async findIdByName(name: string): Promise<string | null> {
    const result = await this.cityModel.findOne({ name: name });
    this.logger.debug(`findIdByName: Found feature Id by name ${name}. Id = ${result?.id}`);
    return result?.id ?? null;
  }

  public async findOrCreate(dto: FeatureDTO): Promise<DocumentType<FeatureEntity>> {
    const result = await this.findByName(dto.name);
    if (result) { return result; }
    return this.create(dto);
  }

}
