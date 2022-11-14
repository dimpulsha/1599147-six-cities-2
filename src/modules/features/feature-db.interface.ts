import { DocumentType } from '@typegoose/typegoose';
import FeatureDTO from './dto/create-feature.dto.js';
import { FeatureEntity } from './feature.entity.js';


export interface FeatureDatabaseInterface {
  create(dto: FeatureDTO): Promise<DocumentType<FeatureEntity>>;
  findOrCreate(dto: FeatureDTO): Promise<DocumentType<FeatureEntity>>;
  findByName(name: string): Promise<DocumentType<FeatureEntity> | null>;
  findIdByName(name: string): Promise<string | null>;
}
