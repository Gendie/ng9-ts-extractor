import { localizeRegex } from '../xlf-utils';

export interface LocalizeDate {
    source: string,
    id: string,
    target?: string
}

export function extractLocalize(fileContent: string): LocalizeDate[] {
    const localizeStrings = fileContent.match(localizeRegex.id);
    if (!localizeStrings) {
        return [];
    }
    return localizeStrings.map(localizeString => localizeString.match(localizeRegex.idDetails))
        .map(match => ({
            id: match.groups.id,
            source: match.groups.source.replace(/\${(?<variable>((?!}).)+)}/g, match => {
                const matchDetails = match.match(/\${(?<variable>((?!}).)+)}/);
                return `<x id="INTERPOLATION" equiv-text="{{${matchDetails.groups.variable}}}"/>`;
            })
        }));
}



// ToDo

// $localize `some string to localize`

// $localize`:meaning|description@@id:source message text`;

// $localize`:meaning|:source message text`;

// $localize`:description:source message text`;

// $localize`:@@id:source message text`;

// $localize `Hi ${name}! There are ${items.length} items.`;
// will generate a message-source of Hi {$PH}! There are {$PH_1} items.

// The recommended practice is to name the placeholder associated with each expression though.

// Do this by providing the placeholder name wrapped in : characters directly after the expression. These placeholder names are stripped out of the rendered localized string.

// For example, to name the items.length expression placeholder itemCount you write:

// $localize `There are ${items.length}:itemCount: items`;
// Escaping colon markers

// If you need to use a : character directly at the start of a tagged string that has no metadata block, or directly after a substitution expression that has no name you must escape the : by preceding it with a backslash:

// For example:

// // message has a metadata block so no need to escape colon
// $localize `:some description::this message starts with a colon (:)`;
// // no metadata block so the colon must be escaped
// $localize `\:this message starts with a colon (:)`;
// // named substitution so no need to escape colon
// $localize `${label}:label:: ${}`
// // anonymous substitution so colon must be escaped
// $localize `${label}\: ${}`
// Processing localized strings:

// There are three scenarios:

// compile-time inlining: the $localize tag is transformed at compile time by a transpiler, removing the tag and replacing the template literal string with a translated literal string from a collection of translations provided to the transpilation tool.

// run-time evaluation: the $localize tag is a run-time function that replaces and reorders the parts (static strings and expressions) of the template literal string with strings from a collection of translations loaded at run-time.

// pass-through evaluation: the $localize tag is a run-time function that simply evaluates the original template literal string without applying any translations to the parts. This version is used during development or where there is no need to translate the localized template literals.

// @param messageParts — a collection of the static parts of the template string.

// @param expressions — a collection of the values of each placeholder in the template string.

// @returns — the translated string, with the messageParts and expressions interleaved together.

