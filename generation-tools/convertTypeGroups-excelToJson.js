const { getPokemon } = require("./excelToJson");

const keys = [
    "key",
    "listStart",
    "-",
    "listEnd",
    "default",
    "berry",
]

const fs = require('fs');
var finalResult = "";

var fileName = "";

// Get data for each row, and assign it to the corresponding header key
const parseRow = (row, rowNum) => {
    if (row == "") return;

    let rowResult = "";
    var cells = row.split(",");

    const cellCount = cells.length;

    for (let i = 0; i < cellCount; i++) {

        let cell = cells[i];
        let key = keys[i];

        if (key == "listStart") rowResult += "pokemon: [ ";
        if (key == "listStart" || key == "listEnd" || key == "-") {
            if (cell != "") rowResult += '"' + cell + '", ';
            if (key == "listEnd") rowResult += " ], ";
            continue;
        }

        if (i == 0) rowResult += "{ "

        // Make sure the string values maintain format - since this data may go directly to the site
        rowResult += key + ': "' + cell + '", '

    }

    rowResult += " },\n"
    finalResult += rowResult;
}

const parseData = (inputData) => {
    var rows = inputData.split(/\r?\n/);

    let keysObtained = false;
    let rowNum = 0;
    rows.forEach(row => {

        if (!keysObtained) {
            keysObtained = true;
        }
        else {
            parseRow(row, rowNum);
            rowNum++;
        }
    });
}

const writeToFile = () => {

    console.log("Writing to file....");
    fs.writeFile(fileName + ".ts", finalResult, (err) => {
        if (err) {
            console.error('Error writing to file');
            throw err;
        }
    })
}

const fetchFileData = () => {
    fs.readFile(fileName + ".csv", 'utf8', ((err, inputData) => {

        if (err) {
            console.error('Error getting file');
            console.log(err)
        }

        finalResult += "export const typeGroups : any[] = [\n"
        parseData(inputData);
        finalResult += "]";
        writeToFile();

    }))
}


const start = (fN) => {
    fileName = fN;

    fetchFileData();
}

start("typeGroups");