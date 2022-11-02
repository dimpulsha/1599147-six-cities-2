export interface MocksGeneratorInterface {
  // generate возвращает строку тестовых данных с разделителями для записи в tsv-файл
  generate():string;
}
