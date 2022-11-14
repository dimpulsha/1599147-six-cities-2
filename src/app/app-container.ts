import { Container } from 'inversify';
import { Component } from './app-component.js';
import { types } from '@typegoose/typegoose';
import RESTApplication from './rest-app.js';
import { LoggerInterface } from '../common/logger-service/logger.interface.js';
import { ConfigInterface } from '../common/config.service/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { UserDatabaseInterface } from '../modules/user/user-database.interface.js';
import { CityDatabaseInterface } from '../modules/cities/city-db.interface.js';
import { FeatureDatabaseInterface } from '../modules/features/feature-db.interface.js';
import LoggerService from '../common/logger-service/logger.service.js';
import ConfigService from '../common/config.service/config.service.js';
import DatabaseService from '../common/database-client/database.service.js';
import UserDatabaseService from '../modules/user/user-database.service.js';
import CityDatabaseService from '../modules/cities/city-db.service.js';
import FeatureDatabaseService from '../modules/features/feature-db.service.js';
import { UserEntity, UserModel } from '../modules/user/user.entity.js';
import { CityEntity, CityModel } from '../modules/cities/city.entity.js';
import { FeatureEntity, FeatureModel } from '../modules/features/feature.entity.js';


const appContainer = new Container();
appContainer.bind<RESTApplication>(Component.RESTApplication).to(RESTApplication).inSingletonScope();
appContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
appContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
appContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
appContainer.bind<UserDatabaseInterface>(Component.UserDatabaseInterface).to(UserDatabaseService);
appContainer.bind<CityDatabaseInterface>(Component.CityDatabaseInterface).to(CityDatabaseService);
appContainer.bind<FeatureDatabaseInterface>(Component.FeatureDatabaseInterface).to(FeatureDatabaseService);
appContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
appContainer.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);
appContainer.bind<types.ModelType<FeatureEntity>>(Component.FeatureModel).toConstantValue(FeatureModel);

export { appContainer };
