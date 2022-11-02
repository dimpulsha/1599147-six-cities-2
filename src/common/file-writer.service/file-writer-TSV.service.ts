import { once } from 'events';
import { createWriteStream, WriteStream } from 'fs';
import { FileWriterInterface } from './file-writer.interface.js';
import { EOL_SYMBOL } from '../../app-config/app.config.js';

export default class TSVFileWriter implements FileWriterInterface {

  private static readonly DEFAULT_ENCODING = 'utf-8';
  private static readonly WRITE_BUFFER_SIZE = 16384 * 4;

  // эта строка нужна т.к. writeStream определяется через конструктор
  private writeStream: WriteStream;

  constructor(public fileName: string) {
    this.writeStream = createWriteStream(this.fileName, {
      highWaterMark: TSVFileWriter.WRITE_BUFFER_SIZE,
      encoding: TSVFileWriter.DEFAULT_ENCODING
    });
  }

  // в потоке для записи другая логика, чем в чтении
  // в чтении в методе read создаем поток и читаем файл до конца
  // а в потоке записи - сначала создаем поток (в конструкторе) затем вызываем метод write -  когда необходимо записать что-то)
  public async write(row: string): Promise<void> {
    if (!this.writeStream.write(`${row}${EOL_SYMBOL}`)) {
      // если не можем записать в поток, ждем события drain в этом потоке
      await once(this.writeStream, 'drain');
      console.log('drain event fired.');
    }
  }

}
