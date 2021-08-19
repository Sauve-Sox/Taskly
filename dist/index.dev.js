"use strict";

var express = require('express');

var app = express();

var path = require('path');

var mongoose = require('mongoose');

var methodOverride = require('method-override');

var Task = require('./Models/task');

mongoose.connect('mongodb://localhost:27017/toDo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('mongo connection open');
})["catch"](function (err) {
  console.log('There Was A mongo Error :(');
  console.log(err);
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express["static"]('public'));
var levels = ['low', 'med', 'high'];
app.get('/tasks/home', function (req, res) {
  res.render('tasks/home');
});
app.get('/tasks', function _callee(req, res) {
  var tasks;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Task.find({}));

        case 2:
          tasks = _context.sent;
          console.log(tasks);
          res.render('tasks/index', {
            tasks: tasks
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get('/tasks/new', function (req, res) {
  res.render('tasks/new', {
    levels: levels
  });
});
app.post('/tasks', function _callee2(req, res) {
  var newTask;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          newTask = new Task(req.body);
          _context2.next = 3;
          return regeneratorRuntime.awrap(newTask.save());

        case 3:
          res.redirect("/tasks/".concat(newTask._id));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get('/tasks/:id', function _callee3(req, res) {
  var id, task;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Task.findById(id));

        case 3:
          task = _context3.sent;
          console.log(task);
          res.render('tasks/details', {
            task: task
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/tasks/:id/edit', function _callee4(req, res) {
  var id, task;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Task.findById(id));

        case 3:
          task = _context4.sent;
          res.render('tasks/edit', {
            task: task,
            levels: levels
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.put('/tasks/:id', function _callee5(req, res) {
  var id, task;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Task.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            "new": true
          }));

        case 3:
          task = _context5.sent;
          res.redirect("/tasks/".concat(task._id));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app["delete"]('/tasks/:id', function _callee6(req, res) {
  var id, task;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Task.findByIdAndDelete(id, req.body));

        case 3:
          task = _context6.sent;
          console.log("".concat(task.name, " has been deleted"));
          res.redirect('/tasks');

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.listen(3000, function () {
  console.log('app is listening on port 3000');
});