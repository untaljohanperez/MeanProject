var mongoose = require('mongoose');

var ProcessSchema = new mongoose.Schema({
	id: Number,
	process: String,
	processingTime: Number,
	remainingTime: Number,
	status: String,
	createdAt: {type: Number, default: Date.now}
});

mongoose.model('Process', ProcessSchema);
