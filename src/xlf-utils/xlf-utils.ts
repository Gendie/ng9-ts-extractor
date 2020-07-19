import { LocalizeDate } from '../extract-localize';
import { localizeRegex } from './regex';

export function appendIdToLocalize(content: string): string {
    return content && content.replace(localizeRegex.localize, match => {
        const haveId = match.match(localizeRegex.id);
        if (haveId) {
            return match;
        }
        const id = generateId();
        const source = match.match(localizeRegex.localizeDetails).groups.source;
        return `$localize \`:@@${id}:${source}\``;
    })
}

const runTimePrefex = Date.now();
let count = -1;
function generateId():string {
    count++;
    return `ts-${runTimePrefex}-${count}`;
}

export function generateXlf(data: LocalizeDate[]): string {
    return data.map(element => `
    <trans-unit id="${element.id}">
        <source>${element.source}</source>
    </trans-unit>
    `).join('\n');
}