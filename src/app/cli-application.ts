// это центральный класс консольного приложения. содержит методы регистрации команд, парсинга строки ввода, поиска команды из списка зарегистрированных и вызов метода найденной команды

import { CliCommandInterface } from '../cli/cli.interface.js';
import { CLICommandList } from '../cli/cli-command-list.enum.js';

// тип данных для распарсенной команды: ключ - значение Используем как тип для возврата результата после парсинга
type ParsedCommand = {
   [key: string]: string[]
 }

//Менеджер команд
// регистрирует список команд (ранее созданные классы), разбирать пользовательский ввод и запускать нужную команду. (выбирать из массива по совпадению пользовательского ввода с зарегистрированной командой)

// класс для менеджера команд
export default class CLIApplication {

  //  хорошая идея - фиксированные значения вынести в статические настройки
  private static readonly COMMAND_PREFIX = '--';
  private static readonly DEFAULT_COMMAND = CLICommandList.Help;

  // команда представлена в виде  ключ(имя) - собственно код команды
  private commands: { [propertyName: string]: CliCommandInterface } = {};

  // =================
  // парсинг команды приватный метод -  получает аргументы - массив строк, возвращает распарсенную команду - для нее завели тип ParsedCommand
  private parseCommand(cliArguments: string[]): ParsedCommand {
    // обнуляем объект и команду
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith(CLIApplication.COMMAND_PREFIX)) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }
      return acc;
    }, parsedCommand);
  }

  // ====================
  // модуль регистрации - берем массив созданных объектов и
  public registerCommands(commandList: CliCommandInterface[]): void {

    console.log(commandList);

    commandList.reduce((acc, command) => {
      const cliCommand = command;
      // в аккумуляторе acc создается пара ключ-значение
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

  // вспомогательный метод getCommand - из перечня команд -  commands(массив: имя команды + функционал(объект)) достаем функционал команды. если имя не зарегистрированное - возвращаем дефолтную команду)

  private getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[CLIApplication.DEFAULT_COMMAND];
  }


  // собственно выполнение команды. принимает аргументы командной строки, парсит, определяет команду, выполняет.
  public processingCommand(argv: string[]): void {
    // 1 парсим - получаем объект команды имя - параметры
    const parsedCommand = this.parseCommand(argv);
    console.log(parsedCommand);


    // 2 - достаем имя команды из распарсенной строки
    const [commandName] = Object.keys(parsedCommand);

    // todo !!! можно другую логику написать:
    // если имя команды пустое, то команда - дефолтная,  далее вызываем команду с аргументами
    // команду и аргументы можно достать за один проход через Object.entries()
    // вот так красиво:
    //  for (const [name, args] of Object.entries(parsedCommands)) {
    //   this.getCommand(name).execute(...args);
    // }

    // 3 - получаем объект (функционал) из перечня зарегистрированных команд (объектов)
    const command = this.getCommand(commandName);
    // console.log(`processingCommand command - ${JSON.stringify(command)}`);

    // 4 - получаем аргументы из parsedCommand по ключу достаем параметры, а если нет - возвращаем пустой массив
    const argvList = parsedCommand[commandName] ?? [];
    // console.log(`processingCommand argvList - ${argvList}`);

    // 5 вызываем метол execute у объекта, который хранится в command и предаем ему аргументы (и разбираем их через spread ...)
    command.execute(...argvList);

  }


}


