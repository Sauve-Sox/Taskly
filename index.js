const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Task = require('./Models/task');

mongoose
	.connect('mongodb://localhost:27017/toDo', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('mongo connection open');
	})
	.catch((err) => {
		console.log('There Was A mongo Error :(');
		console.log(err);
	});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
const levels = [ 'low', 'med', 'high' ];

app.get('/tasks/home', (req, res) => {
	res.render('tasks/home');
});

app.get('/tasks', async (req, res) => {
	const tasks = await Task.find({});
	console.log(tasks);
	res.render('tasks/index', { tasks });
});

app.get('/tasks/new', (req, res) => {
	res.render('tasks/new', { levels });
});

app.post('/tasks', async (req, res) => {
	const newTask = new Task(req.body);
	await newTask.save();
	res.redirect(`/tasks/${newTask._id}`);
});

app.get('/tasks/:id', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findById(id);
	console.log(task);
	res.render('tasks/details', { task });
});

app.get('/tasks/:id/edit', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findById(id);
	res.render('tasks/edit', { task, levels });
});

app.put('/tasks/:id', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
	res.redirect(`/tasks/${task._id}`);
});

app.delete('/tasks/:id', async (req, res) => {
	const { id } = req.params;
	const task = await Task.findByIdAndDelete(id, req.body);
	console.log(`${task.name} has been deleted`);
	res.redirect('/tasks');
});

app.listen(3000, () => {
	console.log('app is listening on port 3000');
});
