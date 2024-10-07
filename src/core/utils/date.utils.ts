import { parse } from 'date-fns';

export const parseDate = (
  date: string,
  format: string = 'dd.MM.yyyy',
): {
  year: number;
  month: number;
  day: number;
} => {
  const parsedDate = parse(date, format, new Date());

  return {
    year: parsedDate.getFullYear(),
    month: parsedDate.getMonth() + 1,
    day: parsedDate.getDate(),
  };
};
