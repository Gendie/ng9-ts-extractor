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
        expect(extractLocalize(fileContent1)).toBeNull();
    });
    
    it('should extract', () => {
        expect(extractLocalize(fileContent2).length).toEqual(1);
    });
});