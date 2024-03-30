import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges, Output
} from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { NgxCalendarConfigModel } from '../models/ngx-calendar-config.model';
import { NgxCalendarDayComponent } from '../ngx-calendar-day/ngx-calendar-day.component';
import { NgxCalendarMonthComponent } from '../ngx-calendar-month/ngx-calendar-month.component';

@Component({
    standalone: true,
    imports: [
        NgxCalendarDayComponent, NgxCalendarMonthComponent
    ],
    selector: 'ngx-calendar',
    templateUrl: 'ngx-calendar.component.html'
})
export class NgxCalendarComponent implements OnChanges {
    constructor(
        private currentElement: ElementRef
    ) { }

    // text field
    @Input() field: HTMLInputElement | undefined;

    // disable calendar
    @Input() disabled = false;

    // calendar configuration
    @Input() config = new NgxCalendarConfigModel();

    // selected date / event
    @Input() date: Dayjs | undefined;
    @Output() dateChange = new EventEmitter<Dayjs | undefined>();

    //

    // 0 : closed | 1 : day view | 2 : month view
    public mode = 0;

    // date selected in calendar, but not used for display
    public selectDate = dayjs();

    // date visible in calendar
    public viewDate: Dayjs | undefined;

    //

    private iconOpenDiv: Element | undefined;
    private iconClearDiv: Element | undefined;
    private isFieldLoaded = false;
    private isConfigLoaded = false;

    //

    ngOnChanges(): void {
        if (this.config && !this.isConfigLoaded) {
            dayjs.locale(this.config.locale);
            this.isConfigLoaded = true;
        }

        if (!this.isFieldLoaded && this.field) {
            this.initializeField(this.config);
            this.isFieldLoaded = true;
        }

        if (this.date !== undefined && this.date !== null) {
            if (typeof this.date === 'string') {
                this.date = dayjs(this.date);
            }

            if (this.date.isValid() && this.date.isSame(this.selectDate) === false) {
                this.selectDate = this.date.clone();
                this.showDate(false);
            }
        }
        // clear field
        else if (this.isFieldLoaded) {
            this.clear(false);
        }

        if (this.isFieldLoaded) {
            if (this.disabled) {
                this.close();
            }
            this.changeDisable(this.disabled);
        }
    }

    @HostListener('document:click', ['$event'])
    clickedOutside(event: Event): void {
        if (this.isFieldLoaded && this.mode !== 0) {
            const elt = event.target as Element;
            if (elt !== this.field && elt !== this.iconOpenDiv && this.currentElement.nativeElement !== event.target && !this.currentElement.nativeElement.contains(elt)) {
                this.close();
            }
        }
    }

    public open(): void {
        if (!this.disabled && this.field && this.mode === 0) {
            this.mode = 1;
            this.disableScrolling();
            this.toggleIcons(this.config, this.mode, false);
        } else {
            this.close();
        }
    }

    public selectDay(date: Dayjs): void {
        this.selectDate = date;
        this.close();
        this.showDate(true);
    }

    public selectMonth(date: Dayjs): void {
        this.selectDate = date;
        this.mode = 1;
        this.showDate(false);
    }

    public showMonths(): void {
        this.mode = 2;
    }

    //

    private clear(emit: boolean): void {
        if (this.field) {
            this.viewDate = undefined;
            this.field.value = '';
            if (emit) {
                this.dateChange.emit(this.viewDate);
            }
        }
    }

    private close(): void {
        this.mode = 0;
        this.enableScrolling();
        this.toggleIcons(this.config, this.mode, false);
    }

    private changeDisable(value: boolean): void {
        if (this.field) {
            if (value) {
                this.field.setAttribute('disabled', 'disabled');
                this.field.style.cursor = 'not-allowed';
            } else {
                this.field.removeAttribute('disabled');
                this.field.style.cursor = 'pointer';
            }
            this.toggleIcons(this.config, this.mode, value);
        }
    }

    private disableScrolling() {
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = () => window.scrollTo(x, y);
    }

    private toggleIcons(config: NgxCalendarConfigModel, mode: number, forceHide: boolean) {
        const showClear = (mode !== 0 && this.viewDate !== undefined && config.inputClearIconVisible);
        const showOpen = (!showClear && config.inputClearIconVisible);

        if (showClear && !forceHide) {
            this.iconClearDiv?.classList.remove('hide');
        } else {
            this.iconClearDiv?.classList.add('hide');
        }

        if (showOpen && !forceHide) {
            this.iconOpenDiv?.classList.remove('hide');
        } else {
            this.iconOpenDiv?.classList.add('hide');
        }
    }

    private enableScrolling() {
        window.onscroll = () => { };
    }

    private initializeField(config: NgxCalendarConfigModel): void {
        if (this.field) {
            this.field.setAttribute('autocomplete', 'off');
            this.field.setAttribute('readonly', 'readonly');
            this.field.setAttribute('title', config.fieldTitle);

            if (this.field.parentElement && (config.inputOpenIconVisible || config.inputClearIconVisible)) {
                const parentDiv = document.createElement('div');
                parentDiv.classList.add('ngx-calendar-icon');

                // add open icon
                this.iconOpenDiv = document.createElement('i');
                this.iconOpenDiv.classList.add(config.inputOpenIconClass);
                this.iconOpenDiv.addEventListener('click', () => this.open());
                parentDiv.appendChild(this.iconOpenDiv);

                // add clear icon
                this.iconClearDiv = document.createElement('i');
                this.iconClearDiv.classList.add(config.inputClearIconClass, 'hide');
                this.iconClearDiv.addEventListener('click', () => this.clear(true));
                this.iconClearDiv.setAttribute('title', 'Supprimer');
                parentDiv.appendChild(this.iconClearDiv);

                this.field.parentElement.insertBefore(parentDiv, this.field);
                parentDiv.appendChild(this.field);
                parentDiv.appendChild(this.currentElement.nativeElement);
            }

            if (config.editMode === 0) {
                this.field.style.cursor = 'pointer';
                this.field.style.userSelect = 'none';
                this.field.addEventListener('click', () => this.open());
            }
        }
    }

    private showDate(emit: boolean): void {
        if (this.field && this.selectDate && this.selectDate.isValid()) {
            this.viewDate = this.selectDate.clone();
            this.field.value = this.selectDate.locale(this.config.locale).format(this.config.displayDateFormat);
            if (emit) {
                this.dateChange.emit(this.selectDate);
            }
        }
    }

}
