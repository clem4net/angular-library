import { Injectable } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { NgxCalendarConfigModel } from '../models/ngx-calendar-config.model';
import { NgxCalendarDayModel } from '../models/ngx-calendar-day.model';
import { NgxCalendarMonthModel } from '../models/ngx-calendar-month.model';

@Injectable({ providedIn: 'root' })
export class NgxCalendarService {

    public getDaysDefinition(config: NgxCalendarConfigModel): NgxCalendarDayModel[] {
        const result = [];

        const start = config.firstDayIsMonday ? 1 : 0;
        for (let i = start; i < start + 7; i++) {
            const day = new NgxCalendarDayModel();
            day.weekDay = i;
            day.label = dayjs().day(i).locale(config.locale).format(config.dayNameFormat);
            result.push(day);
        }

        return result;
    }

    public getMonths(config: NgxCalendarConfigModel, selectDate: Dayjs, viewDate: Dayjs | undefined): NgxCalendarMonthModel[] {
        const result = [];
        const now = dayjs();
        const firstDay = dayjs().year(selectDate.year()).month(0).date(1);

        for (let i = 1; i < 13; i++) {
            const tmp = firstDay.month(i - 1);
            const tmpMonth = tmp.month();
            const tmpYear = tmp.year();

            const month = new NgxCalendarMonthModel();
            month.month = i;
            month.label = tmp.locale(config.locale).format(config.monthNameFormat);

            month.isDisabled = !this.canSelectMonth(config, tmp);
            month.isNow = (now.month() === tmpMonth && now.year() === tmpYear);
            month.isSelect = (viewDate !== undefined && viewDate.month() === tmpMonth && viewDate.year() === tmpYear);
            result.push(month);
        }

        return result;
    }

    public getWeeks(config: NgxCalendarConfigModel, selectDate: Dayjs, viewDate: Dayjs | undefined): NgxCalendarDayModel[] {
        const result: NgxCalendarDayModel[] = [];

        const now = dayjs();

        const startDay = selectDate.clone().locale(config.locale).startOf('month').startOf('week').hour(0).minute(0).second(0);
        const endDay = selectDate.clone().locale(config.locale).endOf('month').endOf('week').hour(0).minute(0).second(0);

        for (let m = startDay; m.isBefore(endDay); m = m.add(1, 'day')) {
            result.push(this.getDay(config, m, selectDate, viewDate, now));
        }

        return result;
    }

    //

    private getDay(config: NgxCalendarConfigModel, day: Dayjs, selectDate: Dayjs, viewDate: Dayjs | undefined, now: Dayjs): NgxCalendarDayModel {
        const result = new NgxCalendarDayModel();

        result.day = day.date();
        result.month = day.month();
        result.year = day.year();
        const dayId = day.get('day');
        result.weekDay = dayId === 0 ? 7 : dayId;

        result.isNotInMonth = (day.month() !== selectDate.month());
        if (config.displayOnlyDaysOfMonth && result.isNotInMonth) {
            result.isVisible = false;
            result.label = '';
        } else {
            result.isVisible = true;
            result.label = day.locale(config.locale).format(config.dayNumberFormat);
        }

        if (result.isVisible) {
            result.isDisabled = !this.canSelectDay(config, day);
        }

        if (result.isVisible && !result.isDisabled && viewDate) {
            result.isSelect = this.isSame(day, viewDate);
        }

        if (config.displayOnlyDaysOfMonth && !result.isNotInMonth) {
            result.isNow = (result.day === now.date() && result.month === now.month() && result.year === now.year());
        }

        return result;
    }

    private canSelectDay(config: NgxCalendarConfigModel, date: Dayjs): boolean {
        let result = true;
        if (config.minDate && date.isBefore(config.minDate)) {
            result = false;
        }
        if (result && config.maxDate && date.isAfter(config.maxDate)) {
            result = false;
        }
        return result;
    }

    private canSelectMonth(config: NgxCalendarConfigModel, date: Dayjs): boolean {
        let result = true;

        if (config.maxDate && config.maxDate.isBefore(date)) {
            result = false;
        }
        if (config.minDate) {
            const endOfMonth = date.endOf('month');
            if (config.minDate.add(1, 'day').isAfter(endOfMonth)) {
                result = false;
            }
        }

        return result;
    }

    private isSame(d1: Dayjs, d2: Dayjs): boolean {
        return d1.date() === d2.date() && d1.month() === d2.month() && d1.year() === d2.year();
    }

}
