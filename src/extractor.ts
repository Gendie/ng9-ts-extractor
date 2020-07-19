import * as path from "path";

import { getAllFilesPathes, readFiles, updateFiles, appendToFile } from "./files-manager";
import { extractLocalize, LocalizeDate } from './extract-localize';
import { appendIdToLocalize, generateXlf } from './xlf-utils';

export async function extract(projectPath: string, messagesFilePath: string): Promise<void> {

    // Get files names
    const directoryPath = path.join(projectPath, '/src/app');
    const filesPathes = await getAllFilesPathes(directoryPath);

    // autogenerate ids
    await autoGenerateIds(filesPathes);

    // get data from files
    const localizeData = await getFilesData(filesPathes);

    // generate xlf from data
    const xlf = generateXlf(localizeData);

    // append xlf to messages
    appendToFile(path.join(projectPath, messagesFilePath), xlf);

    return Promise.resolve();
}

function autoGenerateIds(filesPathes: string[]): Promise<void[]> {
    return updateFiles(filesPathes, appendIdToLocalize)
}

async function getFilesData(filesPathes: string[]): Promise<LocalizeDate[]> {
    const files = await readFiles(filesPathes);
    const allExtractions: LocalizeDate[] = [];
    for(let file of files) {
        allExtractions.push(...extractLocalize(file));
    }
    return allExtractions;
}