import { Pipe, PipeTransform } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

@Pipe({
    standalone: true,
    name: 'ngxDayjsDate'
})
export class NgxDayjsDatePipe implements PipeTransform {
    transform(value: Dayjs | undefined | null, format: string, defaultValue = '', locale = 'en'): string {
        let result = defaultValue;

        if (value !== undefined && value !== null) {
            if (typeof value === 'string') {
                value = dayjs(value);
            }
            if (value.isValid()) {
                result = value.locale(locale).format(format);
            }
        }

        return result;
    }

}