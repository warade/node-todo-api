require('./config/config');
const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)) return res.status(404).send();
	Todo.findById(id).then((todo) => {
		if(!todo) return res.status(404).send();
		res.send({todo});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)) return res.status(404).send();
	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo) return res.status(404).send();
		res.send({todo});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	if(!ObjectID.isValid(id)) return res.status(404).send();
	if(!_.isBoolean(body.completed)) res.status(400).send({error: 'Boolean value required!'});
	if(_.isBoolean(body.completed) && body.completed) 
		body.completedAt = new Date().getTime();
	else body.completed = false, body.completedAt = null;

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo) return res.status(404).send();
		res.send({todo});
	}).catch((e) => res.status(400).send(e));
});

// User section
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);
	user.save().then((user) => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => res.status(400).send(e));
});

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.listen(port, () => {
	console.log(`Running on port ${port}.`);
});

module.exports = {app};














// var newTodo = new Todo({
// 	text: 'Cook a dinner.',
// 	completed: false,
// 	completedAt: 3
// });

// newTodo.save().then((doc) => {
// 	console.log('newTodo saved.', doc);
// }, (e) => {
// 	console.log('Unable to save newTodo', e);
// });

// var otherTodo = new Todo({
// 	text: '  Sing a song.   '
// });

// otherTodo.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log('Unable to save the otherTodo', e);
// }) 



// var User = mongoose.model('User', {
// 	email: {
// 		type: String,
// 		required: true,
// 		minlength: 1,
// 		trim: true
// 	}
// });

// var newUser = new User({
// 	email: 'warade.anshul@gmail.com'
// });

// newUser.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log('Unable to save new user', e);
// });