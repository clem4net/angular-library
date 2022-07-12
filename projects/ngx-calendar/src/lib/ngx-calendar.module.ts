import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCalendarDayComponent } from './ngx-calendar-day/ngx-calendar-day.component';
import { NgxCalendarMonthComponent } from './ngx-calendar-month/ngx-calendar-month.component';
import { NgxCalendarComponent } from './ngx-calendar/ngx-calendar.component';
import { NgxCalendarService } from './service/ngx-calendar.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgxCalendarComponent,
        NgxCalendarDayComponent,
        NgxCalendarMonthComponent
    ],
    exports: [
        NgxCalendarComponent
    ],
    providers: [
        NgxCalendarService
    ]
})
export class NgxCalendarModule { }
