const fs = require('fs');

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

export function appendOnFile(path: string, content: string){
    fs.appendFile(path, content+"\n", function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

}