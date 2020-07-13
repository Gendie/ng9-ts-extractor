const localizePattern = /\$localize *`.+`/g;

export function extractLocalize(fileContent: string) {
    const localizeStrings = fileContent.match(localizePattern);
    if(!localizeStrings) {
        return null;
    }
    console.log(localizeStrings[0])
    return localizeStrings.map(localizeString => localizeString.match(/:@@(?<id>.+):(?<source>.+)/))
        .map(match => match.groups) || [];
}