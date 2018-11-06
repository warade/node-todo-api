//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//in later versions db is not passed as argument, client is so make 
//changes accordingly.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) return console.log('Unable to connect to database');
	console.log('Connected to database!');

	//findOneAndUpdate
	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("5be15564291a8584d370c5c7")
	// }, {
	// 	//update operators
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((res) => {
	// 	console.log(res);
	// });

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID("5be148864e949e18647d0b35")
	}, {
		$set: {
			name: 'Anshul'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((res) => {
		console.log(res);
	});
	//db.close();
});