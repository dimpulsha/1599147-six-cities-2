// понадобятся типы данных, функции по генерации, граничные значения для параметров (берем из конфигов, если по ним нужно проверять и боевые данные или ставим здесь, если дальше моков они не уходят)
import dayjs from 'dayjs';
import { MocksGeneratorInterface } from './mocks-generator.interface.js';
import { MocksDataType, MocksUserType } from '../../types/mocks-data.type';
import { City } from '../../types/city.type.js';
import { RoomKind } from '../../types/room-type.enum.js';
import { generateRandomValue, getRandomItems, getRandomItem, randomBoolean } from '../../utils/random.js';
import { GuestsCount, Price, RoomsCount, Splitter } from '../../app-config/app.config.js';

export default class OfferGenerator implements MocksGeneratorInterface {

  private static FIRST_WEEK_DAY = 1;
  private static LAST_WEEK_DAY = 7;

  private static OFFER_ZOOM_MIN = 13;
  private static OFFER_ZOOM_MAX = 16;

  // данные получаем  из конструктора. почему? наверное что они передаются один раз и не меняются внутри объекта сколько бы раз ни генерировали наборы строк
  constructor(private mocksTemplate: MocksDataType) { }

  private createCityMocks(city: City): string {
    return [city.name, city.location.latitude, city.location.longitude, city.location.zoom].join(Splitter.ItemSplitter);
  }

  private createOwnerMocks(user: MocksUserType): string {
    const isProUser = randomBoolean().toString();
    return [user.userName, user.email, user.avatarImg, isProUser].join(Splitter.ItemSplitter);
  }

  public generate(): string {
    // на основе данных из конструктора заполняем переменные, а затем складываем в массив и объединяем в сроку методом join.
    // это лучше, чем конструировать строку -  мы не знаем сколько у нас переменных и могут быть пустые переменные...
    // сюда попадают только переменные, которые лучще менять для разных объявлений.
    // фаворит, список юзеров для фаворита, рейтинг, кол-во комментов проставим дефолтными значениями при заполнении
    // связанные моки (пользователь, город, фаворит ) будем заполнять идентификаторами на этапе записи в базу


    const offerTitle = getRandomItem<string>(this.mocksTemplate.offerTitle);
    const offerDescription = getRandomItem<string>(this.mocksTemplate.offerDescription);
    const publicationDate = dayjs().subtract(generateRandomValue(OfferGenerator.FIRST_WEEK_DAY, OfferGenerator.LAST_WEEK_DAY), 'day').toISOString();
    const cityData = getRandomItem<City>(this.mocksTemplate.city);
    const city = this.createCityMocks(cityData);
    const previewImg = getRandomItem<string>(this.mocksTemplate.previewImg);
    const offerImg = getRandomItems<string>(this.mocksTemplate.offerImg).join(Splitter.ItemSplitter);
    const isPremium = randomBoolean();
    const roomKind = getRandomItem([RoomKind.apartment, RoomKind.hotel, RoomKind.house, RoomKind.room]);
    const roomsCount = generateRandomValue(RoomsCount.Min, RoomsCount.Max);
    const guestsCount = generateRandomValue(GuestsCount.Min, GuestsCount.Max);
    const price = generateRandomValue(Price.Min, Price.Max);
    const features = getRandomItems<string>(this.mocksTemplate.features).join(Splitter.ItemSplitter);
    const owner = this.createOwnerMocks(getRandomItem(this.mocksTemplate.owner));
    const offerLatitude = generateRandomValue(cityData.location.latitude - 0.00300, cityData.location.latitude + 0.00300, 6).toString();
    const offerLongitude = generateRandomValue(cityData.location.longitude - 0.00300, cityData.location.longitude + 0.00300, 6).toString();
    const offerLocationZoom = generateRandomValue(OfferGenerator.OFFER_ZOOM_MIN, OfferGenerator.OFFER_ZOOM_MAX);

    return ([offerTitle, offerDescription, publicationDate, city, previewImg, offerImg, isPremium, roomKind, roomsCount, guestsCount, price, features, owner, offerLatitude, offerLongitude, offerLocationZoom ].join(Splitter.DataSplitter));
  }
}

