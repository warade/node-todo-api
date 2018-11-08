var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};

// heroku config:set MONGOLAB_URI="mongodb://faraday_anshul:Meghraj@123@ds151463.mlab.com:51463/todos"


// mongodb://faraday_anshul:Meghraj@123@ds151463.mlab.com:51463/todos