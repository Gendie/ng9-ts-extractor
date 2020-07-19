export const localizeRegex = {
    localize: /\$localize *`((?!`).)+`/g,
    localizeDetails: /\$localize *`(?<source>((?!`).)+)`/,
    id: /\$localize *`:@@(?<id>((?!:).)+):(?<source>((?!`).)+)`/g,
    idDetails: /\$localize *`:@@(?<id>((?!:).)+):(?<source>((?!`).)+)`/
}