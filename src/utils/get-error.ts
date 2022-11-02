export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
//  по сути это проверка на соответствие типу Error. если тип не соответствует - возвращаем пустоту в тексте message
