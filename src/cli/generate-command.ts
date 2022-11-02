// import { appendFile } from 'fs/promises';
import got from 'got';
import { CliCommandInterface } from './cli.interface.js';
import { CLICommandList } from './cli-command-list.enum.js';
import { MocksDataType } from '../types/mocks-data.type.js';
import OfferGenerator from '../common/mocks-generator/offer-generator.js';
import TSVFileWriter from '../common/file-writer.service/file-writer-TSV.service.js';

export default class GenerateCommand implements CliCommandInterface {

  public readonly name = CLICommandList.Generate;
  private initialData!: MocksDataType;

  public async execute(...parameters: string[]): Promise<void> {

    const [count, fileName, url] = parameters;
    // проверка, что никакой элемент не null
    const offerCount = parseInt(count, 10);
    console.log(offerCount);

    // тут могут быть проверки - а число ли вернули, а есть ли такой каталог, а что вернул url.

    try {
      this.initialData = await got.get(url).json();

      // логично всю функциональность поместить внутрь - если сервера нет, то и генерировать нечего.
      const offerGenerator = new OfferGenerator(this.initialData);
      const writeStream = new TSVFileWriter(fileName);

      for (let i = 0; i < offerCount; i++) {
        // await appendFile(fileName, `${offerGenerator.generate()}\n`, 'utf8');
        await writeStream.write(offerGenerator.generate());
      }

    } catch {
      console.log(`Can't load initial data from ${url}`);
    }


  }
}
