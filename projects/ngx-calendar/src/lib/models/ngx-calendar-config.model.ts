import { Dayjs } from 'dayjs';

export class NgxCalendarConfigModel {
    // general
    editMode = 0;
    locale = 'en';
    displayDateFormat = 'D MMMM YYYY';
    fieldTitle = 'Choisir une date';

    // icons
    inputOpenIconVisible = true;
    inputOpenIconClass  = 'ngxcal-open';
    inputClearIconVisible = true;
    inputClearIconClass  = 'ngxcal-xmark';

    // select configuration
    minDate: Dayjs | undefined;
    maxDate: Dayjs | undefined;

    // day calendar
    dayHeadFormat = 'MMMM YYYY';
    dayNameFormat = 'dd';
    dayNumberFormat = 'D';

    firstDayIsMonday = true;
    displayOnlyDaysOfMonth = true;

    nextMonthTooltip = 'Mois suivant';
    previousMonthTootip = 'Mois précédent';
    changeMonthTooltip = 'Changer de mois ou d\'année';

    // month calendar
    monthHeadFormat = 'YYYY';
    monthNameFormat = 'MMMM';

    nextYearTooltip = 'Année suivante';
    previousYearTooltip = 'Année précédente';

}
