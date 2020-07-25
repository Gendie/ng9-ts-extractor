import * as path from "path";

import { getFilesOfGlop, readFiles, updateFiles, appendToFile } from "./files-manager";
import { extractLocalize, LocalizeDate } from './extract-localize';
import { appendIdToLocalize, generateXlf } from './xlf-utils';

export async function extract(root: string, include: string, messagesFilePath: string): Promise<void> {

    // Get files names
    // const directoryPath = path.join(projectPath, '/src/app');
    // const filesPathes = await getAllFilesPathes(directoryPath);
    const filesPathes = await getFilesOfGlop(include);

    // autogenerate ids
    await autoGenerateIds(filesPathes);

    // get data from files
    const localizeData = await getFilesData(filesPathes);

    // generate xlf from data
    const xlf = generateXlf(localizeData);

    // append xlf to messages
    appendToFile(path.join(root, messagesFilePath), xlf);

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