// import { appendFile } from 'fs/promises';
import got from 'got';
import { CliCommandInterface } from './cli.interface.js';
import { CLICommandList } from './cli-command-list.enum.js';
import { MocksDataType } from '../types/mocks-data.type.js';
import OfferGenerator from '../common/mocks-generator/offer-generator.js';
import TSVFileWriter from '../common/file-writer.service/file-writer-TSV.service.js';
import { getErrorMessage } from '../utils/get-error.js';

export default class GenerateCommand implements CliCommandInterface {

  public readonly name = CLICommandList.Generate;
  private initialData!: MocksDataType;
  private offerCount!: number;

  public async execute(...parameters: string[]): Promise<void> {
    // let offerCount = 0;
    const [count, fileName, url] = parameters;
    // проверка, что никакой элемент не null
    // тут могут быть проверки - а число ли вернули, а есть ли такой каталог, а что вернул url.
    // todo - вынести валидацию в отдельный модуль

    try {
      this.offerCount = parseInt(count, 10);
      console.log(this.offerCount);
      if (!Number(this.offerCount)) { throw new Error('Arguments "n" must be an integer. Use --generate <n:number> <path> <url>'); }
    } catch (err) { console.log(`${getErrorMessage(err)}`);}

    try {
      this.initialData = await got.get(url).json();

      // логично всю функциональность поместить внутрь - если сервера нет, то и генерировать нечего.
      const offerGenerator = new OfferGenerator(this.initialData);
      const writeStream = new TSVFileWriter(fileName);

      for (let i = 0; i < this.offerCount; i++) {
        await writeStream.write(offerGenerator.generate());
      }

    } catch {
      console.log(`Can't load initial data from ${url}`);
    }


  }
}
