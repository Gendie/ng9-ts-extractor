# ng9-ts-extractor

Angular 9 I18n Extractor from TypeScript files.

## Install

```bash
npm install ng9-ts-extractor --save
```

## What the package do

Angular 9 now supports code based localization via

```bash
$localize:`meaning|description@@id:message`
```

And because there is no extractor until now for code based localization. You have to

- Add `id` to every `$localize`.
- Write `trans-unit` for every `id`.

And That is what ng9-ts-extractor do for you. It adds a unique `id` for every `$localize` that doesn't have an id.
And add `trans-unit` for every `$localize` using its `id`.

## Usage

There is an extraction tool called `ts-extract` that will extract the messages. You should first extract the messages from the templates using the `ng-xi18n` extraction tool from `@angular/compiler-cli` which will create an xliff or xmb file, and then run `ts-extract` on the same file to add the messages extracted from your code. The messages will be merged.

### Example

```bash
ts-extract -i=src/**/*.ts -f=xlf -o=src/i18n/messages.xlf
```

### Commandline arguments

usage
ts-extract [options]

- `--include`, `-i` [string, required]: Files to include. You can use path expansion, glob patterns and multiple paths.

    Example: `-i src/**/*.ts`.

- `--format`, `-f` [string, optional, Default: `xlf`]: Output format. (For now only xlf is supported).

    Example: `-f xlf`

- `--out-file`, `-o` [string, required]: Path where you would like to save extracted strings.

    Example `-o src/i18n/messages.xlf`

### Limitaions

- This package is using regex to extract code based localization. that is why it needs id or automatically assign id to work.

- It extracts code based localization even if it is commented. *The fix is at my TODO*

- No support for meaning and discription. *Currently working on this*

- Supports only `xlf` messages file extenstion. *The fix is at my TODO*

### Other TODO

- Create report at logs
