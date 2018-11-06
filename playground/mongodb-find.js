//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//in later versions db is not passed as argument, client is so make 
//changes accordingly.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) return console.log('Unable to connect to database');
	console.log('Connected to database!');

	// db.collection('Todos').find({
	// 	_id: new ObjectID('5be13bca38d272128c6ff683')
	// }).toArray().then((docs) =>{
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch the docs', err);
	// });

	// db.collection('Todos').find().count().then((count) =>{
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.log('Unable to fetch the docs', err);
	// });

	
	db.collection('Users').find({name: 'Anshul'}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch users.', err);
	});

	db.close();
});