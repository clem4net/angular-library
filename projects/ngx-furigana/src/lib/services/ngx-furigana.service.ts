import { Injectable } from '@angular/core';
import { FuriganaSegment } from '../models/furigana-segment.model';

@Injectable()
export class NgxFuriganaService {
    constructor() {}

    // Public methods

    public getReading(text: string): string {
        let result = '';
        this.parseFurigana(text || '').forEach(x => result += x.reading);
        return result.trim();
    }

    public getExpression(text: string): string {
        let result = '';
        this.parseFurigana(text || '').forEach(x => result += x.expression);
        return result.trim();
    }

    public getHiragana(text: string): string {
        let result = '';
        this.parseFurigana(text || '').forEach(x => result += x.hiragana);
        return result.trim();
    }

    public getReadingHtml(text: string): string {
        let result = '';
        this.parseFurigana(text || '').forEach(x => result += x.readingHtml);
        return result.trim();
    }

    // Private methods

    private parseFurigana(reading: string): FuriganaSegment[] {
        const segments: FuriganaSegment[] = [];

        let currentBase = '';
        let currentFurigana = '';
        let parsingBaseSection = true;

        const characters = reading.split('');
        while (characters.length > 0) {
            const current = characters.shift();

            if (current === '[') {
                parsingBaseSection = false;
            }
            else if (current === ']') {
                parsingBaseSection = true;
                if (currentBase) {
                    segments.push(this.getSegment(currentBase, currentFurigana));
                }
                currentFurigana = '';
                currentBase = '';
            }
            else if (current && this.isLastCharacterInBlock(current, characters) && parsingBaseSection) {
                currentBase += current;
                parsingBaseSection = true;
                segments.push(this.getSegment(currentBase, currentFurigana));
                currentFurigana = '';
                currentBase = '';
            }
            else if (!parsingBaseSection) {
                currentFurigana += current;
            }
            else {
                currentBase += current;
            }
        }

        if (currentBase) {
            segments.push(this.getSegment(currentBase, currentFurigana));
        }
        return segments;
    }

    private getSegment(baseText: string, furigana: string): FuriganaSegment {
        const isUndecorated = (!furigana || furigana.trim().length === 0);
        return new FuriganaSegment(baseText, furigana, isUndecorated);
    }

    private isLastCharacterInBlock(current: string, characters: string[]): boolean {
        return !characters.length ||
            (this.isKanji(current) !== this.isKanji(characters[0]) && characters[0] !== '[');
    }

    /**
     * Test if the character is a kanji.
     * @param character Character to test.
     */
    private isKanji(character: string): boolean {
        return character.charCodeAt(0) >= 0x4e00 && character.charCodeAt(0) <= 0x9faf;
    }

}
