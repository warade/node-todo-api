var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {Users} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.send(e);
	});
});

app.listen(3000, () => {
	console.log(`Running on port 3000.`);
});















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



// var Users = mongoose.model('Users', {
// 	email: {
// 		type: String,
// 		required: true,
// 		minlength: 1,
// 		trim: true
// 	}
// });

// var newUser = new Users({
// 	email: 'warade.anshul@gmail.com'
// });

// newUser.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log('Unable to save new user', e);
// });