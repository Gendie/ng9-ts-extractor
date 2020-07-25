import { extract } from './extractor';

export function execute(projectPath = __dirname, messagesFilePath: string) {

    extract(projectPath, messagesFilePath).then(() => {
        console.log("Done");
    }).catch(err => {
        throw err;
    })

}