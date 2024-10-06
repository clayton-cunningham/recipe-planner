const fs = require('fs');
var finalResult = "";

var fileName = "";
var keys = [];
var keyIndexes = [];

// Get the keys - the headers of each column
const parseKeys = (row) => {
    if (row == "") return;

    var cells = row.split(",");
    const cellCount = cells.length;
    keys = [cells.length];

    for (let i = 0; i < cellCount; i++) {
        var key = cells[i];

        // Fill empty header names
        if (key == "") {
            keys[i] = "SKIP";
            continue;
        }

        keys[i] = key
        // Remove periods, paratheses, etc.
            .replace(".", "").replace("(", "").replace(")", "")
        // Replace # with a string
            .replace("#", "Num")
        // Replace spaces with underscores
            .split(" ").join("_");
    }

}

// Get data for each row, and assign it to the corresponding header key
const parseRow = (row, rowNum) => {
    if (row == "") return;

    let rowResult = "";
    var cells = row.split(",");

    const cellCount = cells.length;

    // if (cellCount != headerNames.length) {
    //     throw new Error("A row's cell count ")
    // }

    rowResult += "{ "
    for (let i = j = 0; i < cellCount; i++) {

        // If the keyIndexes have been specified, skip any indeces that we don't want.
        if (keyIndexes != undefined && keyIndexes.length > 0 & keyIndexes.find(kI => kI == i) == undefined) {
            continue;
        }

        let cell = cells[i];
        let key = keys[j];
        if (cell == '') cell = 0;
        j++;

        // When you choose, add a key at the start of the row
        // if (i == 0) rowResult += "key: '" + rowNum +"', ";

        if (cell == "TRUE" || cell == "FALSE") {
            rowResult += key + ': ' + cell.toLowerCase() + ', '
        }
        else {
            // Make sure the string values maintain format - since this data may go directly to the site
            rowResult += key + ': "' + cell + '", '
        }

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
            // If we did not pass in keys, parse the file for them.  Otherwise, skip this header row
            if (keys == undefined || keys.length == 0) parseKeys(row)
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

        finalResult += "export const pokedex : any[] = [\n"
        parseData(inputData);
        finalResult += "]";
        writeToFile();

    }))
}


const getPokemon = (fN, k, kI) => {
    fileName = fN;
    keys = k;
    keyIndexes = kI;

    fetchFileData();
}

module.exports = { getPokemon };