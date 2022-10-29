export interface CliCommandInterface {
  // поле для имени команды
  readonly name: string;
  // метод execute. параметры командной строки через spread собираем в массив
   execute(...parameters: string[]): void;
 }
