import { Injectable } from '@angular/core';



@Injectable()
export class NgxFileSaverService {
    private isInternetExplorer: boolean;

    constructor() {
        this.detectBrowser();
    }

    //

    public saveUrl(url: string, fileName: string): void {
        const anchor = this.clickUrlPrepare(url, fileName);
        if (anchor === null) {
            this.downloadProcess(url, fileName);
        } else {
            this.clickUrlProcess(anchor);
        }
    }

    public saveBlob(data: Blob, fileName: string): void {
        if (this.isInternetExplorer) {
            this.blobDownloadForIe(data, fileName);
        } else {
            const anchor = this.clickBlobPrepare(data, fileName);
            this.clickBlobProcess(anchor);
        }
    }

    //

    private clickUrlPrepare(url: string, name: string): HTMLAnchorElement {
        let result = document.createElement('a');
        result.download = name;
        result.href = url;
        result.rel = 'noopener';

        if (result.origin !== undefined && result.origin !== window.location.origin) {
            result.target = '_blank';
            if (this.isCorsEnabled(result.href)) {
                result = null;
            }
        }

        return result;
    }

    private clickUrlProcess(anchor: HTMLAnchorElement): void {
        try {
            anchor.dispatchEvent(new MouseEvent('click'));
        } catch (e) {
            const evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
            anchor.dispatchEvent(evt);
        }
    }

    private clickBlobPrepare(data: Blob, name: string): HTMLAnchorElement {
        const result = document.createElement('a');
        result.download = name;
        result.href = URL.createObjectURL(data);
        result.rel = 'noopener';
        return result;
    }

    private clickBlobProcess(anchor: HTMLAnchorElement): void {
        setTimeout(() => { URL.revokeObjectURL(anchor.href); }, 4E4); // 40s
        setTimeout(() => { this.clickUrlProcess(anchor); }, 0);
    }

    private blobDownloadForIe(data: Blob, name: string): void {
        window.navigator.msSaveOrOpenBlob(data, name);
    }


    private detectBrowser(): void {
        this.isInternetExplorer = navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident') > -1;
    }

    private downloadProcess(url: string, name: string): void {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.onload = (() => this.saveBlob(xhr.response, name));
        xhr.onerror = (() => console.error('could not download file'));
        xhr.send();
    }

    private isCorsEnabled(url: string): boolean {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        try {
            xhr.send();
        } catch (e) { }
        return (xhr.status >= 200 && xhr.status <= 299);
    }

}
