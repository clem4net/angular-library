# ngx-calendar

The library is full compatible with Angular, and it's simple to use.

## Source code

Source code can be found on my [GitHub](https://github.com/clem4net/angular-library).

## Browsers

I made some test on following browsers.
| Browser                 | Version        |
| ----------------------- | -------------- |
| Firefox                 | 103            |
| Google Chrome           | 103            |
| Microsoft Edge Chromium | 103            |

## Install
```bash
npm install dayjs
npm install @clemox/ngx-calendar
```

## Usage

1) Import module
```typescript
import { NgxCalendarModule } from '@clemox/ngx-calendar';

@NgModule({ 
    imports: [ NgxCalendarModule ]
})
```  

2) Use in HTML
```html
<input type="text" id="calendar" name="calendar" #calendarField>
<ngx-calendar [field]="calendarField"></ngx-calendar>
```

The tag "ngx-calendar" has a config property.
You can customize the calendar. For example :
 - "locale" : define language ('fr', 'de', 'es' ...)
 - "displayDateFormat" : format of the date displayed in the input
 - "editMode" : "0" if the user can click in all field. "1" if the user need to click on icon. (Maybe later, user can edit the field)
 - "minDate" : minimum date the user can select
 - "maxDate" : maximum date the user can select
 - "firstDayIsMonday" : true if the first day of the week is monday (default is true)
 - "displayOnlyDaysOfMonth" : false if you want to hide days of other months (default is true)

