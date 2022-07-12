import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

import { NgxCalendarConfigModel } from '../models/ngx-calendar-config.model';
import { NgxCalendarTimeModel } from '../models/ngx-calendar-time.model';

@Component({
    selector: 'ngx-calendar-time',
    templateUrl: 'ngx-calendar-time.component.html'
})

export class NgxCalendarTimeComponent implements OnInit, OnChanges {
    constructor() { }

    // configuration globale du calendrier
    @Input() config!: NgxCalendarConfigModel;

    // date sélectionnée
    @Input() selectDate: Dayjs | null = null;

    //

    public time: NgxCalendarTimeModel | null = null;

    public number24: any[] = [];
    public number60: any[] = [];

    //

    ngOnInit(): void {
        for (let i = 0; i < 60; i++) {
            const txt = this.get2Digits(i);
            if (i < 24) {
                this.number24.push({ id: i, text: txt });
            }
            this.number60.push({ id: i, text: txt });
        }
    }

    ngOnChanges(): void {
        if (this.selectDate !== undefined && this.selectDate !== null) {
            this.time = new NgxCalendarTimeModel();
            this.time.hour = this.selectDate.get('hour');
            this.time.minute = this.selectDate.get('minute');
            this.time.second = this.selectDate.get('second');
        }
    }

    public setNow(): void {
        if (this.time !== null) {
            const now = dayjs();
            this.time.hour = now.get('hour');
            this.time.minute = now.get('minute');
            if (this.config !== undefined && this.config.timeSelectSecond) {
                this.time.second = now.get('second');
            }
        }
    }

    //

    private get2Digits(n: number): string {
        let result = n.toString();
        if (n < 10) {
            result = '0' + result;
        }
        return result;
    }

}
