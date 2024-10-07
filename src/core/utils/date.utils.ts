import { isValid, parse, format } from 'date-fns';

export const parseDate = (
  date: string,
  dateFormat: string = 'dd.MM.yyyy',
): {
  year: number;
  month: number;
  day: number;
  formattedDateString: string;
} => {
  const parsedDate = parse(date, dateFormat, new Date());

  if (!isValid(parsedDate)) {
    throw new Error('Invalid date');
  }

  return {
    year: parsedDate.getFullYear(),
    month: parsedDate.getMonth() + 1,
    day: parsedDate.getDate(),
    formattedDateString: format(parsedDate, dateFormat),
  };
};
