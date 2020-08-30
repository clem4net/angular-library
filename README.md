This projet is an inspiration of eligrey FileSave.js : https://github.com/eligrey/FileSaver.js
The library is full compatible with Angular, and it's simple to use.

Tested browsers :
 - Firefox 80
 - Google Chrome 84
 - Microsoft Edge Chromium 85
 - Microsoft Internet Exporer 11
 
1) Import module

import { NgxFileSaverModule } from './../../projects/ngx-file-saver/src/lib/ngx-file-saver.module';
@NgModule({
    imports: [
        NgxFileSaverModule
    ]
})

2) Declare service in component constructor

constructor(
    private fileSaver: NgxFileSaverService
) { }

3) Save files 

From URL 
this.fileSaver.saveUrl(url, 'Test.docx');

From Blob
const blob = new Blob(['Test de blob'], {
    type: 'text/plain'
});
this.fileSaver.saveBlob(blob, 'Test.txt');- 


