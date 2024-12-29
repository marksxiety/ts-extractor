import fs from 'fs'
import path from 'path'

const logfilesPath = '../logfiles'

const files = fs.readdirSync(logfilesPath)
const filteredFiles = files.filter((file) => path.extname(file) == '.csv')

const processFileInfo = (path: string, file: string) => {
    const extracted = fs.readFileSync(`${path}/${file}`, {
        encoding: 'utf-8'
    }).split('\r\n').map((row: string): string[] => {
        return row.split(',')
    })
    return extracted
}

const extractInformation = (path: string, files: string[] | string) => {
    let extractedInfomations: any = []
    if (Array.isArray(files)) {
        for (let index = 0; index < files.length; index++) {
            extractedInfomations.push = processFileInfo(path, files[index])
        }
    } else {
        extractedInfomations = processFileInfo(path, files)
    }

    return extractedInfomations
}

// single file simulation
// const extractedInfo = extractInformation(logfilesPath, 'testlogfile1.csv')
// multiple file simulation
const extractedInfo = extractInformation(logfilesPath, filteredFiles)
console.log(extractedInfo)