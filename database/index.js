var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017')

var db = mongoose.connection;

db.on('open', () => {
  console.log('connected');
})

module.exports = db;
