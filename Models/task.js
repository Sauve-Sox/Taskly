const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
		enum: [ 'low', 'med', 'high' ]
	}
});

const Task = mongoose.model('Task', productSchema);

module.exports = Task;
