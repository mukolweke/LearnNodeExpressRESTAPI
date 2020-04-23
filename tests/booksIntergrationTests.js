require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');
const Book = mongoose.model('Book')
const agent = request.agent(app);


describe('Book CRUD Test', () => {
  it('should allow a book to be saved and return read and _id', (done) => {

    const bookPost = { title: 'Sample Book', author: 'Jack Reacher', genre: 'Action Drama' }

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.should.have.property('_id');
        results.body.title.should.equal('Sample Book');
        done()
      });
  });


  afterEach((done)=>{
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  })
})