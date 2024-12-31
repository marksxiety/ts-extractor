import fs from 'fs'
import path from 'path'
import type { FileMetadata } from './types/index'

// Define the folder path where log files are stored
const logfilesPath = '../logfiles'

// Get all files from the specified folder
const files = fs.readdirSync(logfilesPath)

// Filter out only CSV files from the list of files
const filteredFiles = files.filter((file) => path.extname(file) == '.csv')

// Process a single file to extract its content as an array of rows and columns
const processFileInfo = ({ path, filename }: FileMetadata) => {
    const extracted = fs.readFileSync(`${path}/${filename}`, {
        encoding: 'utf-8',
    })
        .split('\r\n') // Split the file content into rows
        .map((row: string): string[] => row.split(',')) // Split each row into columns
    return extracted
}

// Extract information from one or multiple files
const extractInformation = (path: string, filename: string | string[]) => {
    let extractedInformations: any[] = []

    // If multiple files are provided, process each file
    if (Array.isArray(filename)) {
        for (let index = 0; index < filename.length; index++) {
            extractedInformations.push(
                processFileInfo({ path, filename: filename[index] })
            )
        }
    } else {
        // If a single file is provided, process it
        extractedInformations.push(processFileInfo({ path, filename }))
    }
    return extractedInformations
}

// Uncomment this to test extraction for a single file
// const extractedInfo = extractInformation(logfilesPath, 'testlogfile1.csv')

// Extract information from multiple files (filtered CSV files)
const extractedInfo = extractInformation(logfilesPath, filteredFiles)
console.log(extractedInfo)