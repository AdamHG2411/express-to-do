const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/todo");

mongoose.Promise = Promise;

module.exports = mongoose;