import { extract } from './extractor';

export function execute(projectPath: string, messagesFilePath: string) {

    extract(projectPath, messagesFilePath).then(() => {
        console.log("Done");
    }).catch(err => {
        throw err;
    })

}

execute(__dirname, '/src/i18n/messages.xlf');