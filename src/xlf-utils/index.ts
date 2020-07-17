import { LocalizeDate } from '../extract-localize';

export function generateXlf(data: LocalizeDate[]): string {
    return data.map(element => `
    <trans-unit id="${element.id}">
        <source>${element.source}</source>
    </trans-unit>
    `).join('\n');
}