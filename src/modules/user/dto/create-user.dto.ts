export default class CreateUserDTO {
  // "!" - означает, что должен быть создан обязательно
  public userName!: string;
  public email!: string;
  public avatarImg?: string;
  public password!: string;
  public isProUser!: boolean;
}

