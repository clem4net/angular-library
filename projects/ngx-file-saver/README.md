# ngx-file-saver

This projet is an inspiration of eligrey [FileSave.js](https://github.com/eligrey/FileSaver.js).  
The library is full compatible with Angular, and it's simple to use.

## Source code

Source code can be found on my [GitHub](https://github.com/clem4net/angular-library).

## Browsers

I made some test on following browsers.
| Browser                 | Version        |
| ----------------------- | -------------- |
| Firefox                 | 80             |
| Google Chrome           | 84             |
| Microsoft Edge Chromium | 85             |
| Microsoft IE            | 11             |

## Install
```bash
npm install @clemox/ngx-file-saver
```

## Usage

1) Import module
```typescript
import { NgxFileSaverModule } from '@clemox/ngx-file-saver';

@NgModule({ 
    imports: [ NgxFileSaverModule ]
})
```  

2) Declare service
```typescript
import { NgxFileSaverModule } from '@clemox/ngx-file-saver';

constructor(
    private fileSaver: NgxFileSaverService
) { }
```  

3) Download file or blob
```typescript
this.fileSaver.saveUrl(url, 'Test.docx');
```
```typescript
const blob = new Blob(['Test de blob'], { type: 'text/plain' });
this.fileSaver.saveBlob(blob, 'Test.txt');-
```