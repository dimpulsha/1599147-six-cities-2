import { inject, injectable } from 'inversify';
import { Component } from '../../app/app-component.js';
import { DocumentType, types } from '@typegoose/typegoose';
// import { ConfigInterface } from '../../common/config.service/config.interface';
import { LoggerInterface } from '../../common/logger-service/logger.interface.js';
import { UserDatabaseInterface } from './user-database.interface.js';
import CreateUserDTO from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';


@injectable()
export default class UserDatabaseService implements UserDatabaseInterface {

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    // userModel - это доступ к оаботе с уже с БД. Средствами, которые дает moongoose
    // @inject(Component.ConfigInterface) private readonly config: ConfigInterface
  ) {}

  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.createPassword(dto.password, salt);
    // !!! для асинхронной функции не забывай await для асинхронных вызовов
    const result = await this.userModel.create  (user);
    this.logger.info(`User DBService: create user ${dto.email}`);
    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    const result = await this.userModel.findOne({ email: email });
    this.logger.info(`Find user by email: ${email}`);
    return result;
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    // remember about await
    const result = await this.findByEmail(dto.email);
    if (!result) {
      return await this.create(dto, salt);
    }
    return result;
  }

}
