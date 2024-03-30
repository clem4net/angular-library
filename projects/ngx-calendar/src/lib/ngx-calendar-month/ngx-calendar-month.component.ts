import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import { NgxCalendarConfigModel } from '../models/ngx-calendar-config.model';
import { NgxCalendarMonthModel } from '../models/ngx-calendar-month.model';
import { NgxCalendarService } from '../service/ngx-calendar.service';

@Component({
    standalone: true,
    selector: 'ngx-calendar-month',
    imports: [],
    templateUrl: 'ngx-calendar-month.component.html'
})
export class NgxCalendarMonthComponent implements OnInit {
    constructor(
        private calendarService: NgxCalendarService
    ) { }

    @Input() config!: NgxCalendarConfigModel;

    @Input() selectDate!: Dayjs;
    @Input() viewDate: Dayjs | undefined;

    @Output() dateChange = new EventEmitter<Dayjs>();

    //

    public currentYear = '';
    public months: NgxCalendarMonthModel[] = [];

    //

    public now = dayjs();

    //

    ngOnInit(): void {
        this.refreshMonths();
        this.refreshYear();
    }

    public selectMonth(month: NgxCalendarMonthModel): void {
        if (!month.isDisabled) {
            this.selectDate = this.selectDate.year(this.selectDate.year()).month(month.month - 1);
            this.dateChange.emit(this.selectDate);
        }
    }

    public changeYearClick(value: number, type: ManipulateType): void {
        this.selectDate = this.selectDate.add(value, type);
        this.refreshMonths();
        this.refreshYear();
    }

    //

    private refreshMonths(): void {
        this.months = this.calendarService.getMonths(this.config, this.selectDate, this.viewDate);
    }

    private refreshYear(): void {
        this.currentYear = this.selectDate.locale(this.config.locale).format(this.config.monthHeadFormat);
    }

}
