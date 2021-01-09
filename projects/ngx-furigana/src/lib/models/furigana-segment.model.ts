export class FuriganaSegment {
    constructor(baseText: string, furigana: string, isUndecorated: boolean) {
        this.expression = baseText;
        if (isUndecorated === false) {
            this.hiragana = furigana.trim();
            this.reading = baseText + '[' + furigana + ']';
            this.readingHtml = '<ruby><rb>' + baseText + '</rb><rt>' + furigana + '</rt></ruby>';
        }
        else {
            this.hiragana = baseText;
            this.reading = baseText;
            this.readingHtml = baseText;
        }
    }


    public expression: string;
    public hiragana: string;
    public reading: string;
    public readingHtml: string;

}
