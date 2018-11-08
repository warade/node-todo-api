var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI);

module.exports = {mongoose};
// heroku config:set MONGOLAB_URI="mongodb://faraday_anshul:chandra123@ds151463.mlab.com:51463/node-todo-api"



// mongodb://faraday_anshul:chandra123@ds151463.mlab.com:51463/node-todo-api