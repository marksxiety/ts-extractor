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
            extractedInformations.push({
                filename: filename[index],
                content: processFileInfo({ path, filename: filename[index] })
            })
        }
    } else {
        // If a single file is provided, process it
        extractedInformations.push({
            filename: filename,
            content: processFileInfo({ path, filename: filename })
        })
    }
    return extractedInformations
}

// Uncomment this to test extraction for a single file
// const extractedInfo = extractInformation(logfilesPath, 'testlogfile1.csv')

// Extract information from multiple files (filtered CSV files)
const extractedInfo = extractInformation(logfilesPath, filteredFiles)


const processExtraction = (data: string[], row: number, header: string) => {
    let extractionResult: any[] = []

    // loop first the content every filename
    for (let i = 0; i < data.length; i++) {
        // loop the content (pre row) that treated as an array
        for (let j = 0; j < data[i].length; j++) {
            // find the row in the loop and the row number
            if ((row - 1) === j) {
                if (data[i][j][0].toLowerCase() === header.toLowerCase()) {
                    extractionResult.push(data[i][j][1]) // assuming that the data is in the next column
                }
            }
        }
    }
    if (extractionResult.length > 0) {
        return console.log(extractionResult)
    } else {
        return console.log('No data found')
    }
}
processExtraction(extractedInfo, 1, 'program:')