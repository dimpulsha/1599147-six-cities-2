import { Offer } from '../types/offer.type.js';
import { City } from '../types/city.type.js';
import { User } from '../types/user.type.js';
import { Splitter } from '../app-config/app.config.js';

const generateCity = (cityLine: string): City => {
  const [name, latitude, longitude, zoom] = cityLine.split(Splitter.ItemSplitter);
  return {
    name,
    location: {
      latitude: Number(latitude),
      longitude:  Number(longitude),
      zoom: Number(zoom)
    }
  };
};

const generateUser = (ownerLine: string): User => {
  const [userName, email, avatarImg, isProUser] = ownerLine.split(Splitter.ItemSplitter);
  return {
    userName,
    email,
    avatarImg,
    isProUser: Boolean(isProUser)
  };
};

export const createOffer = (row: string) => {

  const dataLine = row.replace('\n', '').split(Splitter.DataSplitter);

  const [offerTitle, offerDescription, publicationDate, cityLine, previewImg, offerImg, isPremium, roomKind, roomsCount, guestsCount, price, features, ownerLine, latitude, longitude, zoom ] = dataLine;

  console.log('run createOffer');

  return {
    offerTitle,
    offerDescription,
    publicationDate: new Date(publicationDate),
    city: generateCity(cityLine),
    previewImg,
    offerImg: offerImg.split(Splitter.ItemSplitter),
    isPremium: Boolean(isPremium),
    isFavorite: false,
    roomKind,
    roomsCount: parseInt(roomsCount, 10),
    guestsCount: parseInt(guestsCount, 10),
    price: parseInt(price, 10),
    features: features.split(Splitter.ItemSplitter),
    owner: generateUser(ownerLine),
    offerLocation: {
      latitude: Number(latitude),
      longitude:  Number(longitude),
      zoom: Number(zoom)
    }
  } as Offer;
};
