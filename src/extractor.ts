import * as path from "path";

import { getAllFilesPathes, readFile, appendToFile } from "./files-manager";
import { extractLocalize, LocalizeDate } from './extract-localize';
import { generateXlf } from './xlf-utils';

export async function extract(projectPath: string, messagesFilePath: string): Promise<void> {

    // Get files names
    const directoryPath = path.join(projectPath, '/src/app');
    const filesPathes = await getAllFilesPathes(directoryPath);

    // get data from files
    const localizeData = await getFilesData(filesPathes);
    
    // generate xlf from data
    const xlf = generateXlf(localizeData);

    // append xlf to messages
    appendToFile(path.join(projectPath, '/src/i18n/messages.xlf'), xlf);

    return Promise.resolve();
}

function getFilesData(filesPathes: string[]): Promise<LocalizeDate[]> {
    return new Promise((resolve, reject) => {
        const promises: Promise<string>[] = [];
        filesPathes.forEach(path => {
            promises.push(readFile(path));
        })
        Promise.all(promises).then(filesContent => {
            const allExtractions: LocalizeDate[] = [];
            for(let content of filesContent) {
                allExtractions.push(...extractLocalize(content));
            }
            resolve(allExtractions);
        }).catch(err => reject(err));
    })
}