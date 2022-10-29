#!/usr/bin/env node

// это точка входа в CLI приложение - тут создаются экземпляры классов-команд, и экземпляр класса-приложеия, вызываются методы класса-приложеия.

//  импортируем класс приложения и классы команд
import VersionCommand from './cli/version-command.js';
import HelpCommand from './cli/help-command.js';
import CLIApplication from './app/cli-application.js';

//  создаем экземпляр менеджера

const cli = new CLIApplication();

// регистрируем известные команды
cli.registerCommands([
  new VersionCommand,
  new HelpCommand
]);

console.log(`process argv = ${process.argv}`);

// передаем в метод processingCommand содержимое строки ввода - разбирайся
cli.processingCommand(process.argv);
