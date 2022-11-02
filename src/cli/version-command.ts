// считываем package.json и выводим значение поля version
// синхронное чтение файла
import { readFileSync } from 'fs';
// подключаем интерфейс
import { CliCommandInterface } from './cli.interface.js';
// хорошая идея - список команд в перечисление загнать
import { CLICommandList } from './cli-command-list.enum.js';


// класс для описания команды
export default class VersionCommand implements CliCommandInterface {

  // выносим константы отдельно
  private static readonly DEFAULT_VERSION_FILE = './package.json';
  private static readonly DEFAULT_ENCODING = 'utf-8';
  // name - требуется по интерфейсу
  public readonly name = CLICommandList.Version;

  //execute - требуется по интерфейсу. решаем что делает. выводит в консоль значение параметра из JSON.
  // следствие - нужна ф - ция для чтения json и получения параметра - возвращает строку
  // метод приватный т/к/ нужен только внутри
  private getVersion(): string {
    // читаем файл
    const rawJSON = readFileSync(VersionCommand.DEFAULT_VERSION_FILE, VersionCommand.DEFAULT_ENCODING);
    // парсим json в объект
    const contentJSON = JSON.parse(rawJSON);
    // возвращаем поле с версией
    return (contentJSON.version);
  }

  // метод асинхронный
  public async execute(): Promise<void>  {
    const version = this.getVersion();
    console.log(version);
  }

}
