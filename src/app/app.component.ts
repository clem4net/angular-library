import { Component } from '@angular/core';
import { NgxCalendarComponent } from '../../projects/ngx-calendar/src/lib/ngx-calendar/ngx-calendar.component';
import { NgxFuriganaService } from '../../projects/ngx-furigana/src/lib/services/ngx-furigana.service';
import { NgxFileSaverService } from './../../projects/ngx-file-saver/src/lib/services/ngx-file-saver.service';



@Component({
    standalone: true,
    selector: 'app-root',
    imports: [
        NgxCalendarComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent {
    constructor(
        private fileSaver: NgxFileSaverService,
        private furiganaService: NgxFuriganaService
    ) { }

    public urlDownload(url: string): void {
        this.fileSaver.saveUrl(url, 'Test.docx');
    }

    public blobDownload(): void {
        const blob = new Blob(['Test de blob'], {
            type: 'text/plain'
        });
        this.fileSaver.saveBlob(blob, 'Test.txt');
    }

    public furiganaGetReading(text: string): string {
        return this.furiganaService.getReading(text);
    }

    public furiganaGetExpression(text: string): string {
        return this.furiganaService.getExpression(text);
    }

    public furiganaGetHiragana(text: string): string {
        return this.furiganaService.getHiragana(text);
    }

    public furiganaGetHtml(text: string): string {
        return this.furiganaService.getReadingHtml(text);
    }

}
