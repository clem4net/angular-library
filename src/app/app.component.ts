import { Component } from '@angular/core';

import { NgxFileSaverService } from './../../projects/ngx-file-saver/src/lib/services/ngx-file-saver.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(
        private fileSaver: NgxFileSaverService
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

}
