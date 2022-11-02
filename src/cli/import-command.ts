// import { readFileSync } from 'fs';
// подключаем интерфейс
import { CliCommandInterface } from './cli.interface.js';
// хорошая идея - список команд в перечисление загнать
import { CLICommandList } from './cli-command-list.enum.js';
import TSVFileReader from '../common/file-reader.service/file-reader-TSV.service.js';
import { getErrorMessage } from '../utils/get-error.js';
import { createOffer } from '../utils/create-offer.js';

// класс для описания команды
export default class ImportCommand implements CliCommandInterface {

  public readonly name = CLICommandList.Import;

  // обработчик события для чтения строки
  private onLine(dataLine: string): void {
    console.log('onLine event');

    const completeOffer = createOffer(dataLine);
    // console.log(`completeOffer = ${completeOffer}`);
    console.log(completeOffer);
  }

  // обработчик события для конца файла
  private onEndOfFile (counter: number): void {
    console.log(`File complete read. ${counter} row(s) were imported`);
  }


  public async execute(fileName: string): Promise<void> {
    const fileReader = new TSVFileReader(fileName.trim());
    // добавление подписчиков для конкретного экземпляра ридера
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onEndOfFile);

    try {
      // нужно вызывать .read(), чтобы заполнить внутренний обхект this.rawData в fileReader
      fileReader.read();
    } catch (err) { console.log(`import - Can't read file: ${getErrorMessage(err)}`);}
  }

}
