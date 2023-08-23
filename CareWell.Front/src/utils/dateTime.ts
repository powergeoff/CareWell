import formatFn from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
 
export class DateTime {
  public static init(dateTime: string | Date | null | undefined): Date {
    return typeof dateTime === 'string' ? parseISO(dateTime) : (dateTime as Date);
  }

  public static toUrlDate(date: Date | undefined | null): string | undefined {
    return date != null ? this.format(date, 'isodate') : undefined;
  }

  public static toUrlDateTime(date: Date | undefined | null): string | undefined {
    return date != null ? this.format(date, 'iso') : undefined;
  }

  public static format(
    date: Date | undefined | null,
    format?:
      | 'day'
      | 'date'
      | 'datetime'
      | 'day and datetime'
      | 'iso'
      | 'isodate'
      | 'time'
      | 'shortMonth'
      | 'shortDay'
  ) {
    if (date == null) return '';
    let useFormat: string;
    switch (format) {
      case 'shortMonth':
        useFormat = 'MMM';
        break;
      case 'day':
        useFormat = 'EEEE';
        break;
      case 'shortDay':
        useFormat = 'EEE';
        break;
      case 'date':
        useFormat = 'MM/dd/yyyy';
        break;
      case 'datetime':
        useFormat = 'MM/dd/yyyy hh:mm a';
        break;
      case 'day and datetime':
        useFormat = 'EEEE MM/dd/yyyy HH:mm:ss';
        break;
      case 'time':
        useFormat = 'pp';
        break;
      case 'iso':
        useFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";
        break;
      case 'isodate':
        useFormat = 'yyyy-MM-dd';
        break;
      default:
        useFormat = 'MM/dd/yyyy HH:mm';
        break;
    }
    const value = formatFn(date, useFormat);
    return value;
  }
}
