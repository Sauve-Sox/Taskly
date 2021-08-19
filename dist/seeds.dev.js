"use strict";

var mongoose = require('mongoose');

var Task = require('./Models/task');

mongoose.connect('mongodb://localhost:27017/toDo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('mongo connection open');
})["catch"](function (err) {
  console.log('There Was A mongo Error :(');
  console.log(err);
}); // const t = new Task({
// 	name: 'Clean Baseboards',
// 	details: 'Upstairs and downstairs',
// 	level: '2'
// });
// t
// 	.save()
// 	.then((p) => {
// 		console.log(t);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

var seedTasks = [{
  name: ' microwave',
  details: 'interior and the plate',
  level: 'low'
}, {
  name: 'kitchen trash can',
  details: 'the liner as well as the outer casing inside and out',
  level: 'hard'
}, {
  name: 'bedroom windows',
  details: 'the shelf and glass',
  level: 'med'
}, {
  name: 'bedroom ceiling fan',
  details: 'fan blades',
  level: 'low'
}, {
  name: 'medicine cabinets',
  details: 'both in the hall and downstairs bathrooms dust exterior and clean interior',
  level: 'med'
}, {
  name: 'light fixtures',
  details: 'clean fixtures in both hall and downstairs bathrooms',
  level: 'low'
}];
Task.insertMany(seedTasks).then(function (res) {
  console.log(res);
})["catch"](function (e) {
  console.log(e);
});