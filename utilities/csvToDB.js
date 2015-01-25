var Store     = require('../app/models/store');
var Sale      = require('../app/models/sale');
var mongoose  = require('mongoose');
var ObjectID  = require('mongodb').ObjectID;
var Converter = require("csvtojson").core.Converter;
var fs        = require("fs");

// Dummy variable
var param = {};

var rStream      = [];
var csvConverter = [];
var csvFileName  = [];
var convertCount = 0;
var noOfFiles    = 0;

var dir = '../juniorsales/';
var juniorSales = process.argv[2];


console.log('Looking for CSV files in: ' + juniorSales);

// config files
var db = require('../config/db');

// connect to our mongoDB database
mongoose.connect(db.url);

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
    console.log('Mongodb opened by Mongoose: '+ db.url);
});


/**
 * Push JSON object, a day's sale, to Firebase
 * @param jsonObj
 */
function toDB(jsonObj){
    for (var c = 0; c < jsonObj.length; c++) {

        var sale = new Sale({
            sum   : jsonObj[c].sum,
            _store: jsonObj[c].store,
            date  : jsonObj[c].date});

        sale.save(function (err) {
            if (err) {
                console.log('Could not save sale, ' + sale + ' to DB');
            }
        });
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

        csvFileName[fn]  = juniorSales + '/csv/' + files[fn];
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
