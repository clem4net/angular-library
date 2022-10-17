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

1) Update tsconfig.json
Add the following line in "compilerOptions" (because of dayjs) :
```
"allowSyntheticDefaultImports": true,
```  

1) Import module
```typescript
import { NgxCalendarModule } from '@clemox/ngx-calendar';

@NgModule({ 
    imports: [ NgxCalendarModule ]
})
```  

2) Import CSS
@import '~@clemox/ngx-calendar/src/lib/assets/ngx-calendar.css';

3) Use in HTML
```html
<input type="text" id="calendar" name="calendar" #calendarField>
<ngx-calendar [field]="calendarField"></ngx-calendar>
```

4) Use locale (fr, es ...)
If you just need english, you can forget this configuration.

Somewhere in the main module, add the following line. Replace "fr" by you locale country : "de", "es" ...
```typescript
import('dayjs/locale/fr');
```

Next, create a configuration object "NgxCalendarConfigModel" and set "locale" property to your wanted locale.
Set the configuration object to calendar input.
```html
<input type="text" id="calendar" name="calendar" #calendarField>
<ngx-calendar [field]="calendarField" [config]="myConfig" [disabled]="false"></ngx-calendar>
```

4) Convert Dayjs date to display string with pipe
The modume has a display pipe : "ngxDayjsDate".
Arguments are default value and locale.
For example :
```
{{model.date | ngxDayjsDate:'DD MMMM YYYY':'Pas de valeur':'fr'}}
```


With configuraiton, you can customize the calendar. For example :
 - "locale" : define language ('fr', 'de', 'es' ...)
 - "displayDateFormat" : format of the date displayed in the input
 - "editMode" : "0" if the user can click in all field. "1" if the user need to click on icon. (Maybe later, user can edit the field)
 - "minDate" : minimum date the user can select
 - "maxDate" : maximum date the user can select
 - "firstDayIsMonday" : true if the first day of the week is monday (default is true)
 - "displayOnlyDaysOfMonth" : false if you want to hide days of other months (default is true)

