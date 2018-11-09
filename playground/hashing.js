const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
	id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);

// var message = "I am user 4";
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// //server or client
// var data = {
// 	id: 4
// };
// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// //attacker
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// //client or server
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(token.hash === resultHash) console.log('Data is safe');
// else console.log('Data was manipulated');