import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import dayjs from 'dayjs';
import { Dayjs, ManipulateType } from 'dayjs';
import { NgxCalendarConfigModel } from '../models/ngx-calendar-config.model';
import { NgxCalendarDayModel } from '../models/ngx-calendar-day.model';
import { NgxCalendarService } from '../service/ngx-calendar.service';

@Component({
    selector: 'ngx-calendar-day',
    templateUrl: 'ngx-calendar-day.component.html'
})
export class NgxCalendarDayComponent implements OnInit, OnChanges {
    constructor(
        private calendarService: NgxCalendarService
    ) { }

    @Input() config!: NgxCalendarConfigModel;

    @Input() selectDate!: Dayjs;
    @Input() viewDate: Dayjs | undefined;

    @Output() dateChange = new EventEmitter<Dayjs>();

    @Output() showMonthView = new EventEmitter();

    //

    public daysDefinition: NgxCalendarDayModel[] = [];
    public days: NgxCalendarDayModel[] = [];

    public currentMonth = '';

    //

    ngOnInit(): void {
        this.daysDefinition = this.calendarService.getDaysDefinition(this.config);
    }

    ngOnChanges(): void {
        this.refreshDays();
        this.refreshMonth();
    }

    //

    public selectDay(day: NgxCalendarDayModel): void {
        if (day.isVisible && !day.isDisabled) {
            this.selectDate = dayjs().year(day.year).month(day.month).date(day.day);
            this.dateChange.emit(this.selectDate);
        }
    }

    public changeMonthClick(value: number, type: ManipulateType): void {
        this.selectDate = this.selectDate.add(value, type);
        this.refreshDays();
        this.refreshMonth();
    }

    public viewMonthClick(): void {
        this.showMonthView.emit();
    }

    //

    private refreshDays(): void {
        this.days = this.calendarService.getWeeks(this.config, this.selectDate, this.viewDate);
    }

    private refreshMonth(): void {
        this.currentMonth = this.selectDate.locale(this.config.locale).format(this.config.dayHeadFormat);
    }

}
