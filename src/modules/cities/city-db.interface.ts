import { DocumentType } from '@typegoose/typegoose';
import CityDTO from './dto/create-city.dto.js';
import { CityEntity } from './city.entity.js';

export interface CityDatabaseInterface {

  create(dto: CityDTO): Promise<DocumentType<CityEntity>>
  findByName(name: string): Promise<DocumentType<CityEntity>| null>
  findIdByName(name: string): Promise<string | null>
  findOrCreate(dto: CityDTO): Promise<DocumentType<CityEntity>>

}
