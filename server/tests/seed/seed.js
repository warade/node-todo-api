const jwt = require('jsonwebtoken');

const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

var userOneId = new ObjectID().toString();
var userTwoId = new ObjectID().toString();

const users = [{
	_id: userOneId,
	email: 'warade.anshul@gmail.com',
	password: 'abc123',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString(),
	}]
}, {
	_id: userTwoId,
	email: 'warade.rashmi@gmail.com',
	password: 'abc123'
}];

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
},{
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333
}];

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();
		// var userOne = User.insertOne(user[0]);
		// var userTwo = User.insertOne(user[1]);
		return Promise.all([userOne, userTwo]);
	}).then(() => done());
};

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then((res) => {
		done();
	}, (e) => {
		done(e);
	});
};

module.exports = {todos, populateTodos, users, populateUsers};

