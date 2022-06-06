import { Injectable } from '@angular/core';


@Injectable()
export class NgxFileSaverService {

    public saveUrl(url: string, fileName: string): void {
        const anchor = this.clickUrlPrepare(url, fileName);
        if (anchor === null) {
            this.downloadProcess(url, fileName);
        } else {
            this.clickUrlProcess(anchor);
        }
    }

    public saveBlob(data: Blob, fileName: string): void {
        const anchor = this.clickBlobPrepare(data, fileName);
        this.clickBlobProcess(anchor);
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
            anchor.click();
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
