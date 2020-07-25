import { extract } from './extractor';

export function execute(root: string, include: string, messagesFilePath: string, format: string) {

    extract(root, include, messagesFilePath).then(() => {
        console.log("Done");
    }).catch(err => {
        throw err;
    })

}