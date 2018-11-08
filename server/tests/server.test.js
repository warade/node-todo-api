const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
},{
	_id: new ObjectID(),
	text: 'Second test todo'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then((res) => {
		done();
	}, (e) => {
		done(e);
	});
});

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