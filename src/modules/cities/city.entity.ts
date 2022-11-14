import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { City } from '../../types/city.type.js';
import { Location } from '../../types/location.type.js';

// prop - для назначения полей modelOptions - для задания параметров бд
const { prop, modelOptions } = typegoose;

export interface CityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})

// в принципе timestamp нужен не всегда. его можно опустить для служебных справочников
export class CityEntity extends defaultClasses.TimeStamps implements City {

  @prop({required: true, trim: true})
    name!: string;

  @prop({required: true})
    location!: Location;

}

export const CityModel = getModelForClass(CityEntity);
