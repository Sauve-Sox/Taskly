"use strict";

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  details: {
    type: String,
    required: true
  },
  level: {
    type: String,
    lowercase: true,
    "enum": ['low', 'med', 'high']
  }
});
var Task = mongoose.model('Task', productSchema);
module.exports = Task;