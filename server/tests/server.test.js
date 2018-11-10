const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
const {User} = require('./../models/user');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	it('Should add first entry in the database!', (done) => {
		var text = 'Just to test things out!';
		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err) return done(err);
			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => done(e));
		});
	});

	it('Should not create entry in case of bad input!', (done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if(err) return done(err);
			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
		});
	});
});

describe('GET /todos/:id', () => {
	it('Should return todo doc', (done) => {
		var id = todos[0]._id.toHexString();
		var text = todos[0].text;
		request(app)
		.get(`/todos/${id}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo._id).toBe(id);
		})
		.end(done);
	});
	it('Should return 404 if id not found', (done) => {
		var id = new ObjectID().toHexString();
		request(app)
		.get(`/todo/${id}`)
		.expect(404)
		.end(done);
	});
	it('Should return 404 for non-object ids', (done) => {
		var id = '123';
		request(app)
		.get(`/todos/${id}`)
		.expect(404)
		.end(done);
	});
});	

describe('DELETE /todos/:id', () => {
	it('Should delete todo doc.', (done) => {
		var id = todos[0]._id.toHexString();
		var text = todos[0].text;
		request(app)
		.delete(`/todos/${id}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo._id).toBe(id);
			expect(res.body.todo.text).toBe(text);
		})
		.end((err, res) => {
			if(err) return done(e);
			Todo.findById(res.body.todo._id).then((todo) => {
				expect(todo).toNotExist();
				done();
			}).catch((e) => done(e));
		});
	});
	it('Should return 404 if ID not found.', (done) => {
		var id = new ObjectID().toHexString();
		request(app)
		.delete(`/todos/${id}`)
		.expect(404)
		.end(done);
	});
	it('Should return 404 for non-object ids', (done) => {
		var id = '123';
		request(app)
		.delete(`/todos/${id}`)
		.expect(404)
		.end(done);
	});
});


describe('PATCH /todo/:id', () => {
	it('Should update the todo', (done) => {
		var id = todos[0]._id.toHexString();
		request(app)
		.patch(`/todos/${id}`)
		.send({
			text: 'Something new',
			completed: true
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe('Something new');
			expect(res.body.todo.completed).toBe(true);
			expect(res.body.todo.completedAt).toBeA('number');
		})
		.end(done);
	});

	it('should clear completedAt if completed is false.', (done) => {
		var id = todos[1]._id.toHexString();
		request(app)
		.patch(`/todos/${id}`)
		.send({
			completed: false,
			completedAt: null
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toNotExist();
		})
		.end(done);
	});
});

describe('GET /users/me', () => {
	it('Should return user if authenticated.', (done) => {
		request(app)
		.get('/users/me')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect((res) => {
			expect(res.body._id).toBe(users[0]._id);
			expect(res.body.email).toBe(users[0].email);
		})
		.end(done);
	});
	it('Should return 401 if not authenticated.', (done) => {
		request(app)
		.get('/users/me')
		.set('x-auth', 'sds')
		.expect(401)
		.expect((res => expect(res.body).toEqual({})))
		.end(done);
	});
});


describe('POST /users', () => {
	it('Should create a user.', (done) => {
		var email = 'warade.aarti@gmail.com';
		var password = 'abc123';
		request(app)
		.post('/users')
		.send({email, password})
		.expect(200)
		.expect((res) => {
			expect(res.header['x-auth']).toExist();
			expect(res.body._id).toExist();
			expect(res.body.email).toBe(email);
		})
		.end((err, res) => {
			if(err) return done(err);
			User.findOne({email}).then((user) => {
				expect(user).toExist();
				expect(user.password).toNotBe(password);
				done();
			});
		});
	});
	it('Should return validation errors if request invalid', (done) => {
		var email = 'and';
		var password = '123';
		request(app)
		.post('/users')
		.send({email, password})
		.expect(400)
		.end(done);
	});	
	it('Should not create user if email is in use.', (done) => {
		var email = users[0].email;
		var password = 'abc123';
		request(app)
		.post('/users')
		.send({email, password})
		.expect(400)
		.end(done);
	});
});