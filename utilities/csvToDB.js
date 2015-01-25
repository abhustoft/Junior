var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

// Dummy variable
var param = {};

var rStream      = [];
var csvConverter = [];
var csvFileName  = [];
var convertCount = 0;
var noOfFiles    = 0;

var dir = '../juniorsales/';

/**
 * Push JSON object, a day's sale, to Firebase
 * @param jsonObj
 */
function toDB(jsonObj){
    for (var c = 0; c < jsonObj.length; c++) {
        console.log(jsonObj[c]);
    }
    console.log('Converted: ' + csvFileName[convertCount]);
    convertCount++;
}

/**
 * Register a format converter on each CSV file
 * @param {array} files
 */
function registerFiles (files){
    noOfFiles = files.length;
    for (var fn = 0; fn < files.length; fn++) {

        csvFileName[fn]  = dir + 'csv/' + files[fn];
        csvConverter[fn] = new Converter(param);
        rStream[fn]      = fs.createReadStream(csvFileName[fn]);

        //end_parsed will be emitted once parsing finished
        csvConverter[fn].on("end_parsed", toDB);
    }
}

/**
 * Activate a conversion stream
 */
function runStream () {
    if (convertCount < noOfFiles) {
        rStream[convertCount].pipe(csvConverter[convertCount]);
    } else {
        clearInterval(timer);
        console.log('Finished!');
    }
}

registerFiles(fs.readdirSync(dir + 'csv/'));
var timer = setInterval(runStream, 1);
