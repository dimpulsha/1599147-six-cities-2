import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { Feature } from '../../types/features.type';

const { prop, modelOptions } = typegoose;

export interface FeatureEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'features'
  }
})

export class FeatureEntity implements Feature {

  @prop({ required: true, unique: true, trim: true })
    name!: string;
}

export const FeatureModel = getModelForClass(FeatureEntity);
