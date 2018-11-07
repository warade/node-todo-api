const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user'); 

var id = "5be1e8c32071ac69243aea08";

// if(!ObjectID.isValid(id)) console.log('Id invalid!');

// Todo.find({
// 	_id: id,
// }).then((todos) => {
// 	console.log(todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todos) => {
// 	console.log(todos);
// });

// Todo.findById(id).then((todos) => {
// 	if(!todos) return console.log('Id not found!');
// 	console.log(todos);
// }).catch((e) => console.log(e));

Users.findById(id).then((user) => {
	if(!user) return console.log('User not found!');
	console.log('User found:');
	console.log(JSON.stringify(user, undefined, 2));
}, (e) => console.log(e));