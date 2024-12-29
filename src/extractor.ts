import fs from 'fs'

const logfilesPath = '../logfiles'

const files = fs.readdirSync(logfilesPath);

for (let index = 0; index < files.length; index++) {
    const extracted = fs.readFileSync(`${logfilesPath}/${files[index]}`, {
        encoding: 'utf-8'
    }).split('\r\n').map((row: string): string[] => {
        return row.split(',')
    })
    console.log(extracted)
}