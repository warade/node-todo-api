//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

//in later versions db is not passed as argument, client is so make 
//changes accordingly.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) return console.log('Unable to connect to database');
	console.log('Connected to database!');

	// db.collection('Todos').insertOne({
	// 	text: 'some text',
	// 	completed: false
	// }, (err, res) => {
	// 	if(err) return console.log('Unable to insert.', err);
	// 	console.log(JSON.stringify(res.ops, undefined, 2));
	// });

	db.collection('Users').insertOne({
		name: 'Payal',
		age: 20,
		location: 'Gwalior'
	}, (err, res) => {
		if(err) return console.log('Unable to insert.', err);
		console.log(JSON.stringify(res.ops, undefined, 2));
		console.log(res.ops[0]._id.getTimestamp());
	});
	

	db.close();
});