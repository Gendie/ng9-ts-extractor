import extract from './extractor';

export function execute(projectPath: string, messagesFilePath: string) {
    
    extract(projectPath, messagesFilePath).then(() => {
        console.log("Done");
    }).then(err => {
        throw err;
    })
    
}