
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var saleSchema = new Schema({
    _store: { type: String, ref: 'Store' },
    date  : Number,
    sum   : Number
});

var Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;

