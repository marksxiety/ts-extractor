import fs from 'fs'
import path from 'path'
import type { FileMetadata } from './types/index'

const logfilesPath = '../logfiles'

const files = fs.readdirSync(logfilesPath)
const filteredFiles = files.filter((file) => path.extname(file) == '.csv')

const processFileInfo = ({path, filename}: FileMetadata) => {
    const extracted = fs.readFileSync(`${path}/${filename}`, {
        encoding: 'utf-8'
    }).split('\r\n').map((row: string): string[] => {
        return row.split(',')
    })
    return extracted
}

const extractInformation = (path: string, filename: string | string[]) => {
    let extractedInformations: any[] = []

    // Check if filename is an array to handle multiple files
    if (Array.isArray(filename)) { 
        for (let index = 0; index < filename.length; index++) {
            extractedInformations.push(processFileInfo({ path, filename: filename[index] }))
        }
    } else {
        // Single file case
        extractedInformations = [processFileInfo({ path, filename })] 
    }
    return extractedInformations
}

// single file simulation
// const extractedInfo = extractInformation(logfilesPath, 'testlogfile1.csv')
// multiple file simulation
const extractedInfo = extractInformation(logfilesPath, filteredFiles)
console.log(extractedInfo)