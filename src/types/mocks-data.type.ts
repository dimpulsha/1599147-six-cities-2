import { CityType } from './city.type.js';
import { FeaturesType } from './features.type.js';

export type MocksUserType = {
  userName: string;
  email: string;
  avatarImg: string;
}

export type MocksDataType = {
  offerTitle: string[];
  offerDescription: string[];
  city: CityType[];
  previewImg: string[];
  offerImg: string[];
  features: FeaturesType;
  owner: MocksUserType[];
}
