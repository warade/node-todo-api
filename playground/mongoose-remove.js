const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user'); 

// Todo.remove({}).then((res) => {
// 	console.log(res);
// });

//findOneAndRemove

Todo.findByIdAndRemove("5be3f626c22d758a8749e57c").then((todo) => {
	console.log(JSON.stringify(todo, undefined, 2));
});