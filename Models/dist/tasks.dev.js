"use strict";

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {
    type: string,
    require: true
  },
  detail: {
    type: string,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
});
var Task = mongosoe.model('Task', productSchema);
module.exports = Task;