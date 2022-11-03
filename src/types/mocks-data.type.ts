import { City } from './city.type.js';
import { Features } from './features.type.js';

export type MocksUser = {
  userName: string;
  email: string;
  avatarImg: string;
}

export type MocksDataType = {
  offerTitle: string[];
  offerDescription: string[];
  city: City[];
  previewImg: string[];
  offerImg: string[];
  features: Features;
  owner: MocksUser[];
}
