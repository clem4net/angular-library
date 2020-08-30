import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxFileSaverModule } from './../../projects/ngx-file-saver/src/lib/ngx-file-saver.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        NgxFileSaverModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
