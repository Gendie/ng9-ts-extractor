import * as fs from 'fs';
// import * as xmldom from 'xmldom';

export function readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err) {
                return reject(err);
            }
            resolve(data);
        })
    })
}

export function writeFile(path: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, 'utf8', (err) => {
            if(err) {
                return reject(err);
            }
            resolve();
        })
    })
}

export function appendToFile(path: string, content: string) {
    fs.appendFile(path, content + "\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

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