# ngx-furigana

This projet is an inspiration of helephant [Gem](https://github.com/helephant/Gem).  
The library is full compatible with Angular, and it's simple to use.

## Source code

Source code can be found on my [GitHub](https://github.com/clem4net/angular-library).

## Browsers

Compatible with all browsers.

## Install
```bash
npm install @clemox/ngx-furigana
```

## Usage

1) Declare service
```typescript
import { NgxFuriganaService } from '@clemox/ngx-furigana';

constructor(
    private furigana: NgxFuriganaService
) { }
```  

2) Call the service

The method "getReading" returns the input text.
```typescript
// return 食[た]べ物[もの]が好きです
this.furigana.getReading('食[た]べ物[もの]が好きです');
```

The method "getExpression" returns the text without [...] hiragana.
```typescript
// return 食べ物が好きです
this.furigana.getExpression('食[た]べ物[もの]が好きです');
```

The method "getHiragana" returns only the hiragana.
```typescript
// return たべものが好きです
this.furigana.getExpression('食[た]べ物[もの]が好きです');
```

The method "getReadingHtml" returns only the RUBY HTML.
```typescript
// return <ruby><rb>食</rb><rt>た</rt></ruby>べ<ruby><rb>物</rb><rt>もの</rt></ruby>が好きです
this.furigana.getReadingHtml('食[た]べ物[もの]が好きです');
```