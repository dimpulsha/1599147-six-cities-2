// нужен для возврата информации
import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import CreateUserDTO from './dto/create-user.dto.js';


export interface UserDatabaseInterface {
  // получаем данные в виде DTO + соль(для создания пароля)  отдаем в виде "документа" на основе Entity
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>  ;

  // Получаем DTO и соль  - отдаем в виде "документа" на основе Entity - обновленного пользователя
  // public update(): Promise<DocumentType<UserEntity>> ;

  // получаем е-мэйл отдаем отдаем в виде "документа" на основе Entity или null - если ничего
  findByEmail(email: string) : Promise<DocumentType<UserEntity> | null> ;

  // получаем е-мэйл, отдаем строку id (служебный, для заполнения базы)
  // findIdByEmail(email: string): Promise<string | null>;

// получаем данные в виде DTO + соль(для создания пароля)  отдаем в виде "документа" на основе Entity
  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>

}
