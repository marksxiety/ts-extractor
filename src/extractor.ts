import fs from 'fs'

const matches = fs.readFileSync('../file.csv', {
    encoding: 'utf-8'
})

console.log(matches)