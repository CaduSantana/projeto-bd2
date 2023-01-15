import { DateTime } from 'luxon';

const DATE_FORMAT = 'dd/MM/yyyy HH:mm';

export function formatDate(date: Date, format: string = DATE_FORMAT): string {
  return DateTime.fromJSDate(date).toFormat(format);
}
