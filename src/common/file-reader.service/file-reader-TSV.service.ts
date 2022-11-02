// createReadStream - для работы с потоками
import { createReadStream } from 'fs';
import EventEmitter from 'events';
import { FileReaderInterface } from './file-reader.interface.js';
import { EOL_SYMBOL } from '../../app-config/app.config.js';

// EventEmitter - реализация чтения через подписки. если порция считалась - записываем, если запись медленнее чтения - ждем, пока все запишется...

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  private static readonly DEFAULT_ENCODING = 'utf-8';
  private static readonly READ_BUFFER_SIZE = 16384 * 4;

  constructor(public  fileName: string) {
    super();
  }

  public async read(): Promise<void> {
    // создание потока
    const readStream = createReadStream(this.fileName, {
      highWaterMark: TSVFileReader.READ_BUFFER_SIZE,
      encoding: TSVFileReader.DEFAULT_ENCODING
    });

    let rawLine = '';
    let endOfLinePosition = -1;
    let lineCount = 0; // просто чтобы что-то вернуть в конце

    // пока будут чунки (части) в потоке
    for await (const chunk of readStream) {
      // к остатку предыдущей строки добавляем новый чунк
      rawLine += chunk.toString();
      console.log(rawLine);


      // проверяем - а не попал ли в rawLine перевод строки и не нужно ли генерить событие
      // пока в rawLine есть  перевод строки (позиция в массиве >= 0)
      while ((endOfLinePosition = rawLine.indexOf(EOL_SYMBOL)) >= 0) {
        // вырезаем от начала до перевода строки - это будет строка данных
        const dataLine = rawLine.slice(0, endOfLinePosition + 1);
        console.log(dataLine);
        // rawLine обрезаем начиная с перевода строки до конца - rawLine = остаток строки (далее в цикле проверим - будет ли еще перевод и так, пока не закончатся "полные" строки)
        rawLine = rawLine.slice(++endOfLinePosition);
        lineCount += 1; // увеличили счетчик строк
        console.log(lineCount);
        // генерируем событие считывание полной строки - line (сами имя придумали)
        // подписчики на событие создаются для конкретного экземпляра TSVFileReader
        this.emit('line', dataLine);
      }
    }
    // конец файла. гененируется стандартное событие end, в него передали число прочитанных строк. чтобы просто потом вывксти
    this.emit('end', lineCount);
  }
}
