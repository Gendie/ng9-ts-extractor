import * as fs from 'fs';

export function readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        })
    })
}

export function readFiles(pathes: string[]): Promise<string[]> {
    const promises: Promise<string>[] = [];
    pathes.forEach(path => {
        promises.push(readFile(path));
    })
    return Promise.all(promises);
}

export function writeFile(path: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        })
    })
}

export async function updateFile(path: string, updater: (content: string) => string): Promise<void> {
    const fileContent = await readFile(path);
    const updatedFileContent = updater(fileContent);
    return await writeFile(path, updatedFileContent);
}

export async function updateFiles(pathes: string[], updater: (content: string) => string): Promise<void[]> {
    const promises: Promise<void>[] = [];
    pathes.forEach(path => {
        promises.push(updateFile(path, updater));
    })
    return Promise.all(promises);
}

export async function appendToFile(path: string, content: string) {
    let fileContent = await readFile(path);
    fileContent = fileContent.replace('</file>', '');
    fileContent = fileContent.replace('</body>', '');
    fileContent = fileContent.replace('</xliff>', '');
    fileContent += content;
    fileContent += `
        </body>
    </file>
</xliff>
    `;
    return await writeFile(path, fileContent);
    // fs.appendFile(path, content + "\n", function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });

}

// export async function appendTansUnits(path: string, content: string): Promise<void> {
//     const file = await readFile(path);
//     const fileDom = new xmldom.DOMParser().parseFromString(file);
//     const contentDom = new xmldom.DOMParser().parseFromString(content);
//     const parent = fileDom.getElementsByTagName('body')[0] as HTMLElement;
//     parent.appendChild(contentDom);
//     const newCotent = new xmldom.DOMParser().serializeToString(fileDom);
//     const newFile = await writeFile(path + '/test2.xlf', newCotent);
//     console.log(newFile);
// }