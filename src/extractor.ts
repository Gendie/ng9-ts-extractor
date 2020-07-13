
const path = require('path');

import { getAllFilesPathes, appendOnFile } from "./files-manager/extract-files";
import { extractLocalize } from './extract-localize';

export default function extract(projectPath: string, messagesFilePath: string): Promise<void> {

    // Get files names
    const directoryPath = path.join(__dirname, '/src/app');
    const filesPathes = getAllFilesPathes(directoryPath);

    // get data from files
    // const localizeData = [];
    // files.forEach(file => {
    //     localizeData.push(...extractLocalize(""))
    // })

    // generate xlf from data

    // append xlf to messages

    return Promise.resolve();
}