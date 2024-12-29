import fs from 'fs'
import path from 'path'

const logfilesPath = '../logfiles'

const files = fs.readdirSync(logfilesPath)
const filteredFiles = files.filter((file) => path.extname(file) == '.csv')

for (let index = 0; index < filteredFiles.length; index++) {
    const extracted = fs.readFileSync(`${logfilesPath}/${filteredFiles[index]}`, {
        encoding: 'utf-8'
    }).split('\r\n').map((row: string): string[] => {
        return row.split(',')
    })
    console.log(extracted)
}