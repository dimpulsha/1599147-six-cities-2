import { User } from '../../types/user.type.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/crypto-utils.js';
import { DEFAULT_AVATAR } from '../../app-config/app.config.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {

  constructor(data: User) {
    super();
    this.userName = data.userName;
    this.email = data.email;
    if (data.avatarImg) { this.avatarImg = data.avatarImg; }
    this.isProUser = data.isProUser;
  }

  @prop({ required: true })
  // ого - нужно права доступа указывать
  public userName!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({required: true, trim: true, default: DEFAULT_AVATAR} )
  public avatarImg!: string;

  @prop({ required: true, default: '' })
  // password - оказывается приватный
  private password!: string ;

  @prop({required: true})
    isProUser!: boolean;

  public createPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
