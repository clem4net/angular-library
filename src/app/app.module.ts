import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCalendarModule } from 'projects/ngx-calendar/src/public-api';
import { NgxFileSaverModule } from 'projects/ngx-file-saver/src/lib/ngx-file-saver.module';
import { NgxFuriganaModule } from 'projects/ngx-furigana/src/lib/ngx-furigana.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        NgxFileSaverModule,
        NgxFuriganaModule,
        NgxCalendarModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
