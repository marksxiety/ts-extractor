import fs from 'fs'

const matches = fs.readFileSync('../file.csv', {
    encoding: 'utf-8'
}).split('\r\n').map((row:string): string[] => {
    return row.split(',')
})

console.log(matches)