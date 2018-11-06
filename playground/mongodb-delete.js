//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//in later versions db is not passed as argument, client is so make 
//changes accordingly.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) return console.log('Unable to connect to database');
	console.log('Connected to database!');

	//deleteMany
	// db.collection('Todos').deleteMany({text: 'Eat lunch'})
	// 	.then((res) => {
	// 		console.log(res);
	// 	});

	//deleteOne
	// db.collection('Todos').deleteOne({text: 'Eat lunch'})
	// .then((res) => {
	// 	console.log(res);
	// });

	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false})
	// .then((res) => {
	// 	console.log(res);
	// });


	// db.collection('Users').deleteMany({name: 'Anshul'})
	// .then((res) => {
	// 	console.log(res);
	// });

	db.collection('Users').findOneAndDelete({
		_id: new ObjectID("5be1489315111d187792d35e")
	})
	.then((res) => {
		console.log(res);
	});

	//db.close();
});