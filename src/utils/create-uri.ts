// mongodb://<username>:<password>@<host>:<port>/<databaseName>?authSource=admin
export const createMongoURI = (
  username: string,
  password: string,
  host: string,
  port: number,
  databaseName: string
): string => (`mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`);
// была ошибка - не указал тип результата функции
