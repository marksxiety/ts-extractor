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

const processExtraction = (data: { filename: string; content: string[] }[], row: number, header: string) => {
    let extractionResult: any[] = []

    // loop first the data parameter that includes content and filename
    data.forEach((info) => {
        let filecontent = info.content
        let filename = info.filename
        for (let i = 0; i < filecontent.length; i++) {

            // loop the content (pre row) that treated as an array
            for (let j = 0; j < filecontent[i].length; j++) {

                // find the row in the loop and the row number
                if ((row - 1) === j) {
                    if (filecontent[i][j].toLowerCase() === header.toLowerCase()) {
                        extractionResult.push({
                            filename: filename,
                            header: header,
                            row: row,
                            values: filecontent[i][1] // assuming that the data is in the next column
                        }) 
                    }
                }
            }
        }
    })

    if (extractionResult.length > 0) {
        return console.log(extractionResult)
    } else {
        return console.log('No data found')
    }
}

// Extract information from multiple files (filtered CSV files)
const extractedInfo = extractInformation(logfilesPath, filteredFiles)
processExtraction(extractedInfo, 1, 'program:')