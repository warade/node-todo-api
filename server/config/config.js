//if env is production on HEROKU then nothing of this gonna run
//NODE_ENV variable will be set to a 
//production string which wont match to any of this.
const env = process.env.NODE_ENV || 'development';
console.log('env ****', env);
if(env === 'development') {
	process.env.PORT = 3000;
	process.env.MONGOLAB_URI = 'mongodb://localhost:27017/TodoApp';
}
if(env === 'test') {
	process.env.PORT = 3000;
	process.env.MONGOLAB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
