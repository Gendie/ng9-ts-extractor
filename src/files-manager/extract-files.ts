const fs = require('fs');
const glob = require("glob");

export function getFilesOfGlop(glop: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        glob(glop, {}, function (err, files) {
            if (err) {
                reject(err);
                return console.log(" errors!", err);
            } else {
                resolve(files || []);
            }
          })
    });
}

export function getAllFilesPathes(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.lstat(path, (err, stats) => {
            if (err) {
                reject(err);
                return console.log(" errors!", err); //Handle error
            }
            else {
                const isDir = stats.isDirectory();
                if (isDir) {
                    fs.readdir(path, function (err, files) {
                        const promises = [];
                        files.forEach(file => {
                            promises.push(getAllFilesPathes(path + '\\' + file))
                        });
                        Promise.all(promises).then(files => {
                            const result = [];
                            files.forEach(f => result.push(...f))
                            resolve(result)
                        })
                    })

                }
                else if (path.includes('.ts')) {
                    resolve([path]);
                } else {
                    resolve([]);
                }
            }
        });
    })
}