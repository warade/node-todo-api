const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value);
			},
			message: `{VALUE} is not a valid email!`
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});
// this is a method overwrited so that we can change
// according to our interest what should be sent back to client
// by sending user object.
UserSchema.methods.toJSON = function () {
	var user = this;
	var userObj = user.toObject();
	return _.pick(userObj, ['_id', 'email']);
};
// This is a schema method we created. not overwrited.
UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	user.tokens = user.tokens.concat([{access, token}]);
	return user.save().then(() => {
		return token;
	});
};

UserSchema.methods.removeToken = function (token) {
	var user = this;
	return user.update({
		$pull: {
			tokens: {token}
		}
	});
};

UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;
	try {
		decoded = jwt.verify(token, 'abc123');
	} catch(e) {
		return Promise.reject();
	}
	return User.findOne({
		'tokens.token' : token,
		'tokens.access': decoded.access,
		'_id': decoded._id
	});
};

UserSchema.pre('save', function (next) {
	var user = this;
	if(user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	}
	else next();
});

UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;
	return User.findOne({email}).then((user) => {
		if(!user) Promise.reject();
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if(res) resolve(user);
				else reject();
			});
		});
	});
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
