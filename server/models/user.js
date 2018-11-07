var mongoose = require('mongoose');

var Users = mongoose.model('Users', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

module.exports = {Users};