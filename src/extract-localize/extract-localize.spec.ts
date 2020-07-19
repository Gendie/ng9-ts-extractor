import { extractLocalize } from './extract-localize';

describe('extractLocalize', () => {

    const fileContent1 = "";
    const fileContent2 = `
    import { Component } from '@angular/core';

    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
    })
    export class AppComponent {
    title = $localize\`:@@id:angular-nine - i18n\`;
    }`;

    it('should extract nothing', () => {
        expect(extractLocalize(fileContent1).length).toEqual(0);
    });

    it('should extract', () => {
        expect(extractLocalize(fileContent2).length).toEqual(1);
    });

    it('multible ":"', () => {
        const localizeString = "$localize `:@@ts-1595150976276-98:You Want to Archive Exam :${exam.name}`";
        const result = extractLocalize(localizeString)[0];
        expect(result.id).toEqual('ts-1595150976276-98');
        expect(result.source).toEqual('You Want to Archive Exam :<x id="INTERPOLATION" equiv-text="{{exam.name}}"/>');
    })

    it('inline if else', () => {
        const localizeString = "$localize `:@@ts-1595150976276-129:Extended MRQ item` : $localize`:@@ts-1595150976276-1290:MRQ item`";
        const result = extractLocalize(localizeString);
        console.log(result);
        const result1 = result[0];
        const result2 = result[1];
        expect(result1).toBeTruthy();
        expect(result1.id).toEqual('ts-1595150976276-129');
        expect(result1.source).toEqual('Extended MRQ item');
        expect(result2).toBeTruthy();
        expect(result2.id).toEqual('ts-1595150976276-1290');
        expect(result2.source).toEqual('MRQ item');
    })

});