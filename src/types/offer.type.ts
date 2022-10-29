import { City } from './city.type.js';
import { Location } from './location.type.js';
import { RoomType } from './room-type.enum.js';
import { Features } from './features.type.js';
import { User } from './user.type.js';

export type Offer = {
  offerTitle: string;
  offerDescription: string;
  publicationDate: Date;
  city: City['name'];
  previewImg: string;
  offerImg: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating?: number;
  offerType: RoomType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  features: Features;
  owner?: User;
  commentsCount?: number;
  offerLocation: Location;
};
